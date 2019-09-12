const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'user_db',
  username: 'root',
  password: 'xxxxx', 
  host: 'localhost',
  dialect: 'mysql',
       pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
       } 
});
// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// setup User model and its fields.
const User = sequelize.define('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
});
User.sync()
  .then(() => console.log('User table created successfully'))
  .catch(err => console.log(`oooh, did you enter wrong database credentials?${err}`));
// export User model for use in other files.
module.exports = User;