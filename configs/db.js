const mongoose = require('mongoose');
const connect = async () =>{
        try{
            await mongoose.connect(process.env.MONGO_URL);
            console.log('Connect to MONGO');
        }
        catch(err){
            console.log("failed to connect to DB!!!");
        }
    }
module.exports = connect;