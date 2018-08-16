const Sequelize = require('sequelize');
const db = new Sequelize('mysql://mysql:Zwx@5233688@95.169.21.44:3306/hkbuyers',{
    pool: {
        max:5 ,
        min: 0,
        acquire: 30000,
        idle:10000
    }
});

module.exports=db;
