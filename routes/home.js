const express = require('express');

const route = express.Router();

route.get('/', (req, res)=>{
    res.status(200).json({"message": "Welcome to Tricog"});
})

module.exports = route;