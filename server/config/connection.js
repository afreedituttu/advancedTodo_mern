const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DATABASE CONNECTED');
}).catch((err)=>{
    return console.log(`ERROR OCCURED ON DATABASE CONNECTING ${err}`);
})