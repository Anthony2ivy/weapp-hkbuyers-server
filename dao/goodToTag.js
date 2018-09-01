const db = require('../config/db')
const Sequelize = require('sequelize')

const  GoodToTag= db.define('good-to-tag',{
    goodId:{type:Sequelize.DataTypes.INTEGER,primaryKey:true},
    tagName:{type:Sequelize.DataTypes.STRING,primaryKey:true},
});

GoodToTag.sync();
module.exports=GoodToTag;