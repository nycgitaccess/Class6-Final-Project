const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("myathens", "root", "y1ann1s851385al", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
module.exports = db;