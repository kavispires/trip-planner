var Sequelize = require('sequelize');
const db = require('./index');
var marked = require('marked');
const Place = require('./place');

var Restaurant = db.define('restaurant', {
    cuisine: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    }
});

Restaurant.belongsTo(Place);

module.exports = Restaurant;

