const Good =  require('./dao/good');
const express = require('express');
const bodyParser = require('body-parser');
const goodRoute =require('./routers/goodRouter');
const app = express();
const multer=require("multer");

let storage = multer.diskStorage({
   destination: function (req,file,cd) {
       cd(null,'imgs\\')
   } ,
    filename: function (req,file,cd) {
       let index = file.originalname.lastIndexOf('.');
       cd(null,file.originalname.substring(0,index)+'-'+Date.now()+file.originalname.substring(index));
    }
});
var upload = multer({
    storage:storage
});

app.use('/good',goodRoute);
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/img',upload.single('img'),function (req,res) {
    res.json({message:'ok'});
});

const server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});


