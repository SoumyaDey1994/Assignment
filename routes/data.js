const xlsx = require('json2xls');
const express = require('express');
const route = express.Router();
const validate = require('../validation/user');

const user = require('../service/user');
const userController = require('../controllers/user');


route.get('/', async (req, res)=>{
    const response = await user.export();
    if(response.success){
        return res.status(200).json({'data': response.result});
    }else{
        return res.status(500).json({"error": error});
    }
})

route.get('/export', xlsx.middleware, async (req, res)=>{
    const response = await user.export();
    if(response.success){
        return res.status(200).xls('user.xlsx', response.result);
    }else{
        return res.status(500).json({"error": error});
    }
})

route.get('/:userId', async (req, res)=>{
    const response = await user.fetchUser(req.params.userId);
    if(response.success){
        return res.status(200).json({"data": response.result});
    }else{
        return res.status(500).json({"error": error});
    }
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

route.post('/bulk', (req, res)=>{
   userController.upload(req, (error, response)=>{
       if(error){
        return res.status(500).json({"error": error});
       }else if(!response.error){
            return res.status(200).json({"message": "Records Inserted Successfully", "data": response.result});
       }else{
        return res.status(500).json({"message": "Error occured while saving data", "error": response.error});
       }
   })
})

route.put('/:userId', async (req, res)=>{
    const userId = req.params.userId || null;
    const updatedInfo = req.body.data || null;
    if(!userId){
        return res.status(400).json({"error": "Please provide a user Id to update details"});
    }
    if(!updatedInfo || Object.keys(updatedInfo).length === 0){
        return res.status(400).json({"error": "No Details to update"});
    }else{
        const response = await user.updateUser(userId, updatedInfo);
        if(response.success){
            return res.status(200).json({"data": response.result});
        }else{
            return res.status(500).json({"error": response.error});
        }
    }
})

route.delete('/:userId', async (req, res)=>{
    const userId = req.params.userId || null;
    if(!userId){
        return res.status(400).json({"error": "Please provide a user Id to update details"});
    }else{
        const response = await user.deleteUser(userId);
        if(response.success){
            return res.status(200).json({"data": response.result});
        }else{
            return res.status(500).json({"error": response.error});
        }
    }
})
module.exports = route;