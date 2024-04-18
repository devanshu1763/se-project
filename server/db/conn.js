const mongoose=require('mongoose');
const db ='mongodb+srv://devanshudgupta:@cluster0.xwmdajs.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(db).then(()=>{
    console.log("connection succesfull");
}).catch((error)=>{
    console.log('error');
});
