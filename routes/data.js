const express = require('express');
const route = express.Router();
const validate = require('../validation/user');

const user = require('../service/user');

route.get('/', (req, res)=>{
    res.status(200).json({"message": "I am in Save Route"});
})

route.post('/', async (req, res)=>{
    if(!req.body || !req.body.data){
        // Handle Validation Error
        res.status(400).json({"error": "Please Provide a valid Request Body having data object"});
    }else{
        const error = validate(req.body.data);
        if(error){
            // Handle Validation Error
            res.status(400).json({"code": error.name, "message":  error.details});
        }else{
            /**Request Successfully validated
            * Inser to mongodb
            */
            const response = await user.insert(req.body.data);
            if(response.success){
                res.status(200).json({"message": "Records Inserted Successfully", "data": response.result});
            }else{
                res.status(500).json({"message": "Error occured while saving data"});
            }
        }
    }
})


module.exports = route;