var Sequelize = require('sequelize');
const db = require('./index');
var marked = require('marked');
const Place = require('./place');

var Hotel = db.define('hotel', {
    name: {
        type: Sequelize.STRING
    },
    num_stars: {
        type: Sequelize.INTEGER
    },
    ammenities: {
        type: Sequelize.STRING
    }
});

Hotel.belongsTo(Place);

module.exports = Hotel;

