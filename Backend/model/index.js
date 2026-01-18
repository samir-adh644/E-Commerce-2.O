const {Sequelize,DataTypes} = require('sequelize')
const databaseConfig = require('../config/dbConfig')



const sequelize = new Sequelize(databaseConfig.DB,databaseConfig.USER,databaseConfig.PASSWORD,{
    host : databaseConfig.HOST, 
    port :3306, 
    dialect : databaseConfig.dialect, 
    operatorsAliases : false, 
    pool : {
        max : 5, 
        min : 0, 
        acquire : 30000,
        idle : 10000
    }
})

sequelize.authenticate()
.then(()=>{
    console.log("milyo hai username password")
})
.catch((err)=>{
    console.log("error aayo hai",err)
})

const db = {};
db.Sequelize = Sequelize 
db.sequelize = sequelize




db.users = require("./userModel.js")(sequelize,DataTypes);
db.products = require("./productModel.js")(sequelize,DataTypes);
db.orders = require("./orderModel.js")(sequelize,DataTypes);
db.carts = require("./cartModel.js")(sequelize,DataTypes);
db.orderItems = require("./orderItemModel.js")(sequelize,DataTypes);


// making relationships
db.users.hasMany(db.carts);
db.carts.belongsTo(db.users);

// Product
db.products.hasMany(db.carts);
db.carts.belongsTo(db.products);
// Orders
db.users.hasMany(db.orders);
db.orders.belongsTo(db.users);

// OrderItems
db.orders.hasMany(db.orderItems);
db.orderItems.belongsTo(db.orders);

db.products.hasMany(db.orderItems);
db.orderItems.belongsTo(db.products);


db.sequelize.sync({force : false}).then(()=>{
    console.log("Synced done!!")
})
module.exports = db 