const express=require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('./db/conn')

const User=require('./models/userschema');
app.use(cookieParser());

app.use(express.json());
app.use(require('./router/auth'))







    app.listen(5000,()=>{
    console.log('hello running')
})