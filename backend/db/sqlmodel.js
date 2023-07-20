const pg = require("pg");
//or native libpq bindings
//var pg = require('pg').native

const conString =
  "postgres://vkczbwoc:3E4s5c0rOziUUEmxkG5AHYoAHsEt3ddJ@stampy.db.elephantsql.com/vkczbwoc"; //Can be found in the Details page
var db = new pg.Client(conString);
db.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  db.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("connected to database");
    // >> output: 2018-08-23T14:02:57.117Z
    // db.end();
  });
});

module.exports = db;
