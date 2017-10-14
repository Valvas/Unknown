'use strict';

let config = require('../../json/database/config');

let databases = require(`../../json/database/${config['techno']}`);

/****************************************************************************************************/

module.exports.createDatabases = function(connector, callback)
{
  let x = 0;
  let array = [];

  let loop = function(database)
  {
    if(config['techno'] == 'mysql')
    {
      connector.query(`CREATE DATABASE IF NOT EXISTS ${Object.keys(databases)[x]}`, function(err, result)
      {
        err ? callback(false, err.message) : array.push(`INFO : database "${Object.keys(databases)[x]}" created !`);
  
        createAllTables(databases[x], function(result, code, message)
        {
          result == false ? callback(false, code, message) : x++;

          Object.keys(databases)[x] == undefined ? callback(true, array.join('\n')) : loop(Object.keys(databases)[x]);
        });
      });
    }
  };

  databases[x] == undefined ? callback(true, 'INFO : no database to create !') : loop(Object.keys(databases)[x]);
}

/****************************************************************************************************/

function createAllTables(database, callback)
{
  let x = 0;

  let loop = function(table)
  {

  };

  Object.keys(database)[x] == undefined ? callback(true, `INFO : no tables to create for database "${database}" !`) : loop(database[Object.keys(database)[x]]);
}

/****************************************************************************************************/