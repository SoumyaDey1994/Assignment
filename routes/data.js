const express = require('express');
const joi = require('joi');
const route = express.Router();


const userModel = require('../model/user');

route.get('/', (req, res)=>{
    res.status(200).json({"message": "I am in Save Route"});
})

route.post('/save', async (req, res)=>{

    //res.status(200).json({"message": "I am going to save data"});
    const schema = joi.array().items(
        joi.object().keys({
            name: joi.string().min(3).required(),
            age: joi.number().required(),
            email: joi.string().email().required(),
            aadharNo: joi.number().integer().min(100000000000).max(999999999999).required()
        }).required()
    )
    if(!req.body || !req.body.data){
        // Handle Validation Error
        res.status(400).json({"error": "Please Provide a valid Request Body having data object"});
    }else{
        const {error, value} = joi.validate(req.body.data, schema);
        if(error){
            // Handle Validation Error
            res.status(400).json({"code": error.name, "message":  error.details});
        }else{
            /**Request Successfully validated
            * Inser to mongodb
            */
            try{
                const response = await userModel.insertMany(req.body.data);
                res.status(200).json({"message": "Records Inserted Successfully", "data": response});
            }catch(error){
                console.log(error);
                res.status(500).json({"message": "Error occured while saving data"});
            }
        }
    }
})


module.exports = route;