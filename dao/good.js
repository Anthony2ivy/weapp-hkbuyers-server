const db = require('../config/db')
const Sequlize = require('sequelize')
const  Good = db.define('good',{
    goodId:{type:Sequlize.DataTypes.INTEGER,autoIncrement:true,primaryKey:true} ,
    images: Sequlize.DataTypes.STRING,
    salePrice: Sequlize.DataTypes.INTEGER,
    buyPrice: Sequlize.DataTypes.INTEGER,
    tags:Sequlize.DataTypes.STRING,
    title:Sequlize.DataTypes.STRING,
    barcode:Sequlize.DataTypes.STRING,
    storage:Sequlize.DataTypes.INTEGER
});

Good.sync();

module.exports=Good;