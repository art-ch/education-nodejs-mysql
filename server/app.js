"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbService = require('../dbService');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// create
app.post('/insert', (req, res) => {
    const { name } = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewName(name);
    result
        .then((data) => res.json({ data }))
        .catch((err) => console.log(err));
});
// read
app.get('/getAll', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
        .then((data) => res.json({ data }))
        .catch((err) => console.log(err));
}));
// update
app.patch('/update', (req, res) => {
    const { id, name } = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateRowByID(id, name);
    result
        .then((data) => res.json({ success: data }))
        .catch((err) => console.log(err));
});
// delete
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRowByID(id);
    result
        .then((data) => res.json({ success: data }))
        .catch((err) => console.log(err));
});
// search
app.get('/search/:name', (req, res) => {
    const { name } = req.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchByName(name);
    result
        .then((data) => res.json({ data }))
        .catch((err) => console.log(err));
});
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
