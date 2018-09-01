const db = require('../config/db')
const Sequelize = require('sequelize')
const  Good = db.define('good',{
    goodId:{type:Sequelize.DataTypes.INTEGER,autoIncrement:true,primaryKey:true} ,
    images: Sequelize.DataTypes.STRING,
    salePrice: Sequelize.DataTypes.INTEGER,
    buyPrice: Sequelize.DataTypes.INTEGER,
    title:Sequelize.DataTypes.STRING,
    barcode:Sequelize.DataTypes.STRING,
    storage:Sequelize.DataTypes.INTEGER
});

Good.sync();

module.exports=Good;