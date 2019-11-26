
const upload = require('../providers/multer');

module.exports = function(request, input){
    upload.single(input)(request, {}, (error, result) =>{
        if(error){
            return callback(error, null);
        }else{
            return callback(null, request);
        }
    })
}