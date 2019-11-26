
const upload = require('../providers/multer');

module.exports = function(input, request, callback){
    upload.single(input.field)(request, {}, (error, result) =>{
        if(error){
            return callback(error, null);
        }else{
            return callback(null, request);
        }
    })
}