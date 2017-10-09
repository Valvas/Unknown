'use strict';

let config = require('../../json/database/config');

let tables = require(`../../json/database/${config['techno']}`);

/****************************************************************************************************/

module.exports.createDatabase = function(connector, callback)
{
  if(config['techno'] == 'mysql')
  {
    let x = 0;
    let array = [];

    let loop = function(database)
    {
      connector.query(`CREATE DATABASE IF NOT EXISTS ${Object.keys(tables)[x]}`, function(err, result)
      {
        err ? callback(false, err.message) : array.push(`INFO : database "${Object.keys(tables)[x]}" created !`);

        x++;

        Object.keys(tables)[x] == undefined ? callback(true, array.join('\n')) : loop(Object.keys(tables)[x]);
      });
    };

    loop(Object.keys(tables)[x]);
  }
}

/****************************************************************************************************/

module.exports.createTables = function(connector, callback)
{

}

/****************************************************************************************************/