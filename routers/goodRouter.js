const express = require('express');
const router = express.Router();
const good = require('../dao/good');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMiddleware =multipart();
const jsonParser=bodyParser.json();
const urlencode =bodyParser.urlencoded({extended:true});
router.get('/',function (req,res) {
    good.findAll().then(goods =>{
        res.send(goods);
    });
});

router.post('/',urlencode,function (req,res) {
    console.log(req.body);
    good.create(req.body).then(result => {
        res.send(result);
    });
});

module.exports=router;