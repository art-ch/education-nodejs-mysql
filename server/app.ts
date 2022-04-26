import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const dbService = require('../dbService');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
// app.post('/insert', (req, res) => {});

// read
app.get('/getAll', async (req, res) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();

  result
    .then((data: any) => res.json({ data }))
    .then((err: any) => console.log(err));
});

// update
// app.post('/insert', (req, res) => {});

// delete
// app.post('/insert', (req, res) => {});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
