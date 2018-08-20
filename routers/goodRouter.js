const express = require('express');
const router = express.Router();
const good = require('../dao/good');
const goodColor = require('../dao/goodColor');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMiddleware =multipart();
const jsonParser=bodyParser.json();
const urlencode =bodyParser.urlencoded({extended:true});
router.get('/',urlencode,function (req,res) {
    good.findAll({
        where:req.query
    }).then(goods =>{
        res.send(goods);
    });
});

router.post('/',urlencode,function (req,res) {
    let createGood = async function(req){
        let {images,salePrice,buyPrice,tags,title,barcode,storage} = req.body;
        let instance={images,salePrice,buyPrice,tags,title,barcode,storage};
        let createdGood = await good.create(instance);
        let colors = await Promise.all(req.body.colors.map(color => {
            color.goodId=goodId;
            return goodColor.create(color);
        }));
        createdGood.colors = colors;
        return await createdGood;
    };
    createGood(req).then(result => {
        res.send(result);
    });
});

router.get('/:id',function (req,res) {
    let id =req.params.id;
    good.findById(id).then(good =>{
        res.json(good);
    });
});

router.delete('/:id',function (req,res) {
    let id =req.params.id;
    good.destroy({where:{
            goodId:id
        }}).then(() => {
            res.json({message:'delete success'});
    })
});

router.post('/:id',urlencode,function (req,res) {
    let id =req.params.id;
    console.log(req.body);
    good.update(req.body,{where: {goodId:id}}).then(() =>{
        res.json({message:'update success'});
    });
});

module.exports=router;