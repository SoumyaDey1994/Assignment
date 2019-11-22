const fs = require('fs');
const multer = require('multer');
const async = require('async');
//Import Validation
const validate = require('../validation/user');
//Import user service
const user = require('../service/user');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'temp');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname);
    }
});

const jsonFileFilter = (req, file, callback) => {
    if(!file.originalname.match(/\.json$/)){
        return callback(new Error('Only JSON file is allowed'), null);
    }else{
        return callback(null, true);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: jsonFileFilter
});

class User{
    /**
     * @description: Read JSON content from Uploaded File
     * @param {*} req 
     * @param {*} callback 
     */
    readUploadedData(req, callback) {
        fs.readFile(__dirname+ '/../temp/'+req.file.filename, 'utf-8', (error, data)=>{
            if(error){
                return callback(error, req.file);
            }else{
                return callback(null, data, req.file);
            }
        })
    }
    /**
     * @description: Remove file from temporary storage
     * @param {*} file 
     */
    removeFile(file){
        fs.unlink(__dirname + '/../'+file.path, (error, response)=>{});
    }
    /**
     * @description: Read data from uploaded file & call service to save the content to Mongodb
     * @param {*} request 
     * @param {*} callback 
     */
    upload(request, callback){
        const tasks = [
            (callback) => {
                upload.single('data')(request, {}, (error, result) =>{
                    if(error){
                        return callback(error, null);
                    }else{
                        return callback(null, request);
                    }
                })
            },
            (input, callback) => {
                if(!input.file || Object.keys(input.file).length === 0){
                    return callback(new Error(`Error in File Upload`), null);
                }else{
                    return this.readUploadedData(request, callback);
                }
            },
            (input, file, callback) => {
                this.removeFile(file);
                return callback(null, input);
            },
            (input, callback) => {
                    const data = JSON.parse(input);
                    if(!data || !Array.isArray(data)){
                        // Handle Validation Error
                        return callback({"error": "No Data Available"}, null);
                    }else{
                        const error = validate(data);
                        if(error){
                            // Handle Validation Error
                             return callback({"code": error.name, "message":  error.details}, null);
                        }else{
                            /**Request Successfully validated
                            * Inser to mongodb
                            */
                                user.insert(data)
                                    .then((response)=>{
                                        return callback(null, response);
                                    })
                                    .catch((error)=>{
                                        return callback(error, null);
                                    })
                            
                        }
                    }
            }
        ];

        async.waterfall(tasks, (error, result) => {
            if(error){
                return callback(error, null);
            }else{
                return callback(null, result);
            }
        })
    }
}

const userController = new User();
module.exports = userController;