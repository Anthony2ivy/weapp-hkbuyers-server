const db = require('../config/db')
const Sequelize = require('sequelize')

const  GoodTag= db.define('good-tag',{
    tagName:{type:Sequelize.DataTypes.STRING,primaryKey:true}
});

GoodTag.sync();
module.exports=GoodTag;