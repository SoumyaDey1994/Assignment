const xlsx = require('json2xls');
const express = require('express');
const route = express.Router();
const validate = require('../validation/user');

const user = require('../services/user');
const userController = require('../controllers/user');


route.get('/', (req, res)=>{
    userController.fetchAllRecords((error, data)=>{
        if(error){
            return res.status(error.status).json({"error": error.errorMsg});
        }else{
            return res.status(data.status).json({"data": data.result});
        }
    })
})

route.get('/export', xlsx.middleware, async (req, res)=>{
    const response = await user.export();
    if(response.success){
        return res.status(200).xls('user.xlsx', response.result);
    }else{
        return res.status(500).json({"error": error});
    }
})

route.get('/:userId', (req, res)=>{
    userController.fetchUser(req.params.userId, (error, data)=>{
        if(error){
            return res.status(error.status).json({"error": error.errorMsg});
        }else{
            return res.status(data.status).json({"data": data.result});
        }
    })
})

route.post('/', (req, res)=>{

    userController.createUser(req.body, (error, data)=>{
        if(error){
            return res.status(error.status).json({"error": error.errorMsg});
        }else{
            return res.status(data.status).json({"data": data.result});
        }
    })
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

route.delete('/:userId', (req, res)=>{
    const userId = req.params.userId || null;
    userController.removeUser(userId, (error, data)=>{
        if(error){
            return res.status(error.status).json({"error": error.errorMsg});
        }else{
            return res.status(data.status).json({"data": data.result});
        }
    })
})
module.exports = route;