const Sequelize = require("sequelize");
const { url } = require('./info')

const db = new Sequelize(process.env.DATABASE_URL || url, {
  logging: false
});

module.exports = db;
