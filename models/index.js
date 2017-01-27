const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/trip_planner');

module.exports = db;