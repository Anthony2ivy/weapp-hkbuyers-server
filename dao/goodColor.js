const db = require('../config/db')
const Sequlize = require('sequelize')
const  GoodColor = db.define('good-color',{
    goodId:{type:Sequlize.DataTypes.INTEGER,primaryKey:true} ,
    color:{type:Sequlize.DataTypes.STRING,primaryKey: true},
    storage:{type:Sequlize.DataTypes.INTEGER},
    buyPrice:{type:Sequlize.DataTypes.INTEGER},
    salePrice:{type:Sequlize.DataTypes.INTEGER},
    barcode:{type:Sequlize.DataTypes.STRING}
});

GoodColor.sync();

module.exports=GoodColor;