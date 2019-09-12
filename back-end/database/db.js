const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("9RJMVDjthZ", "9RJMVDjthZ", "ieZHCKYM6i", {
  host: "remotemysql.com",
  dialect: "mysql",
  operatorsAliases: false
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
module.exports = db;