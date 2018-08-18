const Good =  require('./dao/good');
const express = require('express');
const bodyParser = require('body-parser');
const goodRoute =require('./routers/goodRouter');
const app = express();
const multer=require("multer");
const fs = require('fs');
const https=require('https')
const privatekey=fs.readFileSync('./bin/www.shitaidaigou.club.key','utf-8');
const cert=fs.readFileSync('./bin/www.shitaidaigou.club.crt','utf-8');

let storage = multer.diskStorage({
   destination: function (req,file,cd) {
       cd(null,'./imgs/')
   } ,
    filename: function (req,file,cd) {
       let index = file.originalname.lastIndexOf('.');
       cd(null,Date.now()+file.originalname.substring(index));
    }
});
var upload = multer({
    storage:storage
});

app.use('/good',goodRoute);

app.post('/img',upload.single('img'),function (req,res) {
    let imgPath =req.file.path;
    res.json({path:imgPath});
});
const server =https.createServer({
    key:privatekey,
    cert:cert
},app);


server.listen(443, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at https://%s:%s', host, port);
});


