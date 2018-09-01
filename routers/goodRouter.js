const express = require('express');
const router = express.Router();
const good = require('../dao/good');
const goodColor = require('../dao/goodColor');
const goodToTag = require('../dao/goodToTag');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const jsonParser = bodyParser.json();
const urlencode = bodyParser.urlencoded({extended: true});
const goodTag = require('../dao/goodTag');
router.get('/', urlencode, function (req, res) {
    good.findAll({
        where: req.query
    }).then(goods => {
        res.send(goods);
    });
});

router.post('/', urlencode, function (req, res) {
    let createGood = async function (req) {
        try {
            let {images, salePrice, buyPrice, tags, title, barcode, storage} = req.body;
            let instance = {images, salePrice, buyPrice, title, barcode, storage};
            console.log(req.body);
            console.log(instance);
            let createdGood = await good.create(instance);
            createdGood = createdGood.get({plain: true});
            let colorsObj = JSON.parse(req.body.colors);
            await goodColor.bulkCreate(colorsObj.map(color => {
                let newColor = Object.assign({goodId: createdGood.goodId}, color);
                return newColor;
            }));
            let colorsResult = await goodColor.findAll({where: {goodId: createdGood.goodId}});
            let tagsArray = JSON.parse(tags);
            await Promise.all(tagsArray.map(tagStr => addTag(createdGood.goodId, tagStr)));
            createdGood.colors = colorsResult;
            return await createdGood;
        } catch (e) {
            throw new Error(e.toLocaleString());
        }
    };
    createGood(req).then(result => {
        res.send(result);
    }).catch(e => {
        res.status(500).send(e.toLocaleString());
    });
});

function addTag(goodId, tagName) {
    let promise = new Promise(((resolve, reject) => {
        goodTag.findOrCreate({where: {tagName: tagName}})
            .spread((instance, created) => {
                goodToTag.findOrCreate({where: {tagName: tagName, goodId: goodId}}).then(() => {
                    resolve();
                });
            }).catch(e => {
            reject(e);
        });
    }));
    return promise;
}

router.get('/:id', function (req, res) {
    let id = req.params.id;
    good.findById(id).then(good => {
        res.json(good);
    });
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    good.destroy({
        where: {
            goodId: id
        }
    }).then(() => {
        res.json({message: 'delete success'});
    })
});

router.post('/:id', urlencode, function (req, res) {
    let id = req.params.id;
    console.log(req.body);
    let updateTags = async function (id,goodInstance) {
        try {
            let oldTags = (await goodToTag.findAll({where: {goodId: id}})).map(tmp => tmp.tagName);
            oldTags = new Set(oldTags);
            let newTags;
            newTags = new Set(JSON.parse(goodInstance.tags));
            await Promise.all([...oldTags].map(tmp => {
                if (!newTags.has(tmp)) {
                    return goodToTag.destroy({where: {goodId: id, tagName: tmp}});
                }
            }));
            await Promise.all([...newTags].map(tmp => {
                if (!oldTags.has(tmp)) {
                    goodTag.findOrCreate({where:{tagName:tmp}});
                    return goodToTag.create({goodId: id, tagName: tmp});
                }
            }));
            return await true;
        }catch (e) {
            throw new Error(e.toLocaleString());
        }
    };
    updateTags(id,req.body).then(() => {
        good.update(req.body, {where: {goodId: id}}).then(() => {
            res.json({message: 'update success'});
        });
    }).catch(e =>{
        res.status(500).send(e.toLocaleString());
    });
});

module.exports = router;