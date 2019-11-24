const mongoose = require('mongoose');
const dbConnectionString = process.env.DB_CONNECTION_STRING;

mongoose.set('useFindAndModify', false);

module.exports = function connectToDB(){
    mongoose.connect(dbConnectionString, {useNewUrlParser: true})
        .then(()=>console.log(`Connected to MongoDb Successfully`))
        .catch((error)=>console.log(`Error in connecting to mongoDB: ${error}`));
}
