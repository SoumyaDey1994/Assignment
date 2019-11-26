const fs = require('fs');
const pwd = __dirname + '/../';
const tempDir = pwd + 'temp/';

class FileSystem{

    read(fileName, callback){
        fs.readFile(tempDir + fileName, 'utf-8', (error, data)=>{
            if(error){
                return callback(error, null);
            }else{
                return callback(null, data);
            }
        })
    }

    write(fileName, callback){

    }

    remove(filePath, callback){
        fs.unlink(pwd + filePath, (error, response)=>{
            if(error){
                return callback(error, null);
            }else{
                return callback(true, null);
            }
        });
    }
}

const fileSystem = new FileSystem();
module.exports = fileSystem;