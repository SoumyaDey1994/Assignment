const userModel = require('@model/user');
class User{
    /**
     * Insert Data to MongoDB
     * @param {*} data 
     */
    async insert(data){
        try{
            const result = await userModel.insertMany(data);
            return {"status": 200, "result": result};
        }catch(error){
            return {"status": 500, "error": error};
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
            return {"status": 200, "result": result};                           
        }catch(error){
            return {"status": 500, "error": error};
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
            return {"status": 200, "result": result};                           
        }catch(error){
            return {"status": 500, "error": error};
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
            if(!result){
                return {"status": 404, "result": {"message": `User with Id ${userId} does not exists`}};   
            }else{
                return {"status": 200, "result": result};   
            }                        
        }catch(error){
            return {"status": 500, "error": error};
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
            return {"status": 200, "result": result};
        }catch(error){
            return {"status": 500, "error": error};
        }
    }
}

const user = new User();

module.exports = user;