var Sequelize = require('sequelize');
const db = require('./index');
var marked = require('marked');

var Place = db.define('place', {    
    address: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },    
    state: {
        type: Sequelize.STRING
    }, 
    phone: {
        type: Sequelize.STRING
    },    
    location: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL) 
    }            
});

module.exports = Place;

