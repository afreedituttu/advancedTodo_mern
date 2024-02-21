const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler')

const dotenv = require('dotenv');
dotenv.config({
    path: './config/.env'
})
require('./config/connection');

const routes = require('./routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/api', routes)
app.get('/test',(req, res)=>{
    return res.status(200).json({"message":"working"});
})
app.use((req, res)=>{
    res.status(404).json({success:false, message:`path doesnot exist ${req.url}`})
})
app.use(errorHandler)
const PORT = process.env.PORT || 3001

app.listen(PORT, (err)=>{
    if(err) return console.log(err);
    console.log(`SERVER STARTED ON PORT ${PORT}`);
})