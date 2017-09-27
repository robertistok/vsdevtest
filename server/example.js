var fdb = require('./fake_db');

/*
 * Example of usage of the two available functions on the fake_db module.
 *
 * The intention is to emulate calls to a mongodb collection using the $in operator.
 * Both functions receive an Array as the first parameter and a Function
 * as the second.
 *
 * Note:
 * As with the $in operator, the returned array with the requested objects
 * will not necessarily respect the order in the Array passed by.
 */
fdb.findByNameUrl(['nexus-5'], function(err, data) {
  console.log(data);
});

fdb.findByName(['4k', 'gps', 'Qualcomm Krait 400'], function(err, data) {
  console.log(data);
});
