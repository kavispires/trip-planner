const express = require('express');
const router = express.Router();
const Promise = require('bluebird');

const models = require('../models');

const Place = require('../models/place');
const Hotel = require('../models/hotels');
const Restaurant = require('../models/restaurants');
const Activity = require('../models/activity');


module.exports = router;


router.get('/', function(req, res, next) {

  var findingHotels = Hotel.findAll({
    include: [Place]
  });

  var findingActivities = Activity.findAll({
    include: [Place]
  });

  var findingRestaurants = Restaurant.findAll({
    include: [Place]
  });

  Promise.all([
    findingHotels,
    findingActivities,
    findingRestaurants
  ])
  .spread(function(hotels, activities, restaurants) {
    res.render('index', {
      hotels: hotels,
      activities: activities,
      restaurants: restaurants
    });
  })
  .catch(next);

});