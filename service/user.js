const userModel = require('../model/user');
class User{

    constructor(){

    }

    async insert(data){
        try{
            const result = await userModel.insertMany(data);
            return {"success": true, "result": result};
        }catch(error){
            return {"success": false, "error": error};
        }
    }
}

const user = new User();

module.exports = user;