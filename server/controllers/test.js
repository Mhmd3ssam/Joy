import express from 'express';
import data from '../models/test.js'
const router = express.Router();

export const getTest = router.get("/", (req, res) => {
    res.send(data)
});
export const postTest = router.post("/", (req, res) => {
    res.send({message:[1,2,3]})
});



