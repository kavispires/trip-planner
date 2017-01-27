var Sequelize = require('sequelize');
var marked = require('marked');

var db = new Sequelize('postgres://localhost:5432/trip_planner');

var Data = db.define('entry', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    timestamps: false,
    hooks : {
        
     },   
    getterMethods: {
        
    },
    classMethods: {
        
    },
    instanceMethods: {
    }
});

module.exports = {
    Data: Data
};