const xlsx = require('json2xls');
const express = require('express');
const route = express.Router();
const userController = require('@controller/user');

/**
 * @description: Fetch all user data from Service
 */
route.get('/', (req, res)=>{
    userController.fetchAllRecords((error, data)=>{
        if(error){
            return res.status(error.status).json({"error": error.errorMsg});
        }else{
            return res.status(data.status).json({"data": data.result});
        }
    })
})
/**
 * @description: Export all user data as EXCEL file
 */

route.get('/export', xlsx.middleware, async (req, res)=>{
    userController.fetchAllRecords((error, data)=>{
        if(error){
            return res.status(error.status).json({"error": error.errorMsg});
        }else{
            return res.status(data.status).xls('user.xlsx', data.result);;
        }
    })
})
/**
 * @description: Fetch specific user data by id
 */
route.get('/:userId', (req, res)=>{
    userController.fetchUser(req.params.userId, (error, data)=>{
        if(error){
            return res.status(error.status).json({"error": error.errorMsg});
        }else{
            return res.status(data.status).json({"data": data.result});
        }
    })
})
/**
 * @description: Create new user(s)
 */
route.post('/', (req, res)=>{

    userController.createUser(req.body, (error, data)=>{
        if(error){
            return res.status(error.status).json({"error": error.errorMsg});
        }else{
            return res.status(data.status).json({"data": data.result});
        }
    })
})
/**
 * @description: Bulk upload to create user(s)
 */
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
/**
 * @description: Update Specific user against userId
 */
route.put('/:userId', (req, res)=>{
    const userId = req.params.userId || null;
    const updatedInfo = req.body.data || null;
    userController.updateUser(userId, updatedInfo, (error, data)=>{
        if(error){
            return res.status(error.status).json({"error": error.errorMsg});
        }else{
            return res.status(data.status).json({"data": data.result});
        }
    })
})
/**
 * @description: Remove Specific user against userId
 */
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