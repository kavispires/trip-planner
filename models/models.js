const db = require('./index');

const Place = require('./place');
const Hotel = require('./hotels');
const Restaurant = require('./restaurants');
const Activity = require('./activity');

// Hotel.belongsTo(Place);
// Restaurant.belongsTo(Place);
// Activity.belongsTo(Place);

module.exports = {
	Place: Place,
	Hotel: Hotel,
	Restaurant: Restaurant,
	Activity: Activity,
	db: db
}