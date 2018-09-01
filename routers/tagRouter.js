const express = require('express');
const router = express.Router();
const good = require('../dao/good');
const goodColor = require('../dao/goodColor');
const goodTag =require('../dao/goodTag');
const goodToTag = require('../dao/goodToTag');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMiddleware =multipart();
const jsonParser=bodyParser.json();
const urlencode =bodyParser.urlencoded({extended:true});

router.get('/',urlencode,function (req,res) {
    goodTag.findAll({
        where:req.query
    }).then(tags =>{
        res.send(tags);
    });
});

router.put('/:tag',function (req,res) {
    goodTag.findOrCreate({where:{tagName:req.params.tag}})
        .spread((tag,created) =>{
           res.send(tag.get({plain:true}));
        });
});

router.delete('/:tag',function (req,res) {
    goodTag.findOne({where:{tagName:req.params.tag}}).then(tag => {
        goodToTag.destroy({where:{tagName:tag.tagName}}).then(()=>{
           tag.destroy().then(() =>{
               res.send('delete success');
           });
        });
    }).catch(e =>{
        res.status(500).send(e);
    });
});

module.exports=router;
