const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/miniprojet").then(()=>{
    console.log('connected to db');
}).catch((error)=>{
    console.log(error);
});
mongoose.Promise = global.Promise

