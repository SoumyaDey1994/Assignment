
const multer = require('multer');

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

module.exports = upload;