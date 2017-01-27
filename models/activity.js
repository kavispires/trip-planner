var Sequelize = require('sequelize');
const db = require('./index');
var marked = require('marked');
const Place = require('./place');

var Activity = db.define('activity', {
    name: {
        type: Sequelize.STRING
    },
    age_range: {
        type: Sequelize.STRING
    }
               
});

Activity.belongsTo(Place);

module.exports = Activity;

