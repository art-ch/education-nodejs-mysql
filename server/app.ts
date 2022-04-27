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
app.post('/insert', (req, res) => {
  const { name } = req.body;

  const db = dbService.getDbServiceInstance();

  const result = db.insertNewName(name);

  result
    .then((data: any) => res.json({ data }))
    .catch((err: any) => console.log(err));
});

// read
app.get('/getAll', async (req, res) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();

  result
    .then((data: any) => res.json({ data }))
    .catch((err: any) => console.log(err));
});

// update
app.patch('/update', (req, res) => {
  const { id, name } = req.body;
  const db = dbService.getDbServiceInstance();

  const result = db.updateRowByID(id, name);

  result
    .then((data: any) => res.json({ success: data }))
    .catch((err: any) => console.log(err));
});

// delete
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteRowByID(id);

  result
    .then((data: any) => res.json({ success: data }))
    .catch((err: any) => console.log(err));
});

// search
app.get('/search/:name', (req, res) => {
  const { name } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.searchByName(name);

  result
    .then((data: any) => res.json({ data }))
    .catch((err: any) => console.log(err));
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
