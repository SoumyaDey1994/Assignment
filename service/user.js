const userModel = require('../model/user');
class User{
    /**
     * Insert Data to MongoDB
     * @param {*} data 
     */
    async insert(data){
        try{
            const result = await userModel.insertMany(data);
            return {"success": true, "result": result};
        }catch(error){
            return {"success": false, "error": error};
        }
    }
    /**
     * Fetch Data based on UserId
     * @param {*} userId 
     */
    async fetchUser(userId){
        try{
            let result = await userModel.find({_id: userId})
                                        .select({__v: 0})
                                        .lean();
            return {"success": true, "result": result};                           
        }catch(error){
            return {"success": false, "error": error};
        }
    }
    /**
     * Update User details based on ID
     * @param {*} userId 
     * @param {*} userDetails 
     */
    async updateUser(userId, userDetails){
        try{
            let result = await userModel.findByIdAndUpdate(userId, {$set: userDetails}, {new: true})
                                        .select({__v: 0})
                                        .lean();
            return {"success": true, "result": result};                           
        }catch(error){
            return {"success": false, "error": error};
        }
    }
    /**
     * Remove user from DB against ID
     * @param {*} userId 
     */
    async deleteUser(userId){
        try{
            let result = await userModel.findByIdAndDelete(userId)
                                        .select({__v: 0})
                                        .lean();
            return {"success": true, "result": result};                           
        }catch(error){
            return {"success": false, "error": error};
        }
    }
    /**
     * Fetch all user data from DB
     */
    async export(){
        try{
            let result = await userModel.find({})
                                        .select({__v: 0})
                                        .lean();
            return {"success": true, "result": result};
        }catch(error){
            return {"success": false, "error": error};
        }
    }
}

const user = new User();

module.exports = user;