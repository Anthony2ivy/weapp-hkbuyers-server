const db = require('../config/db')
const Sequelize = require('sequelize')
const  GoodColor = db.define('good-color',{
    goodId:{type:Sequelize.DataTypes.INTEGER,primaryKey:true} ,
    color:{type:Sequelize.DataTypes.STRING,primaryKey: true},
    storage:{type:Sequelize.DataTypes.INTEGER},
    buyPrice:{type:Sequelize.DataTypes.INTEGER},
    salePrice:{type:Sequelize.DataTypes.INTEGER},
    barcode:{type:Sequelize.DataTypes.STRING}
});

GoodColor.sync();

module.exports=GoodColor;