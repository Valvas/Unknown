'use strict';

const functions = require('../functions');
const database = require('../database/queries');

let blacklist = module.exports = {};

/****************************************************************************************************/

//See 'blacklist.md' line 3.

blacklist.suspendAccountForGivenTime = function(identifier, time, connection, callback)
{
  if(identifier == undefined || time == undefined || connection == undefined) callback(false, 406, 'ERROR : missing parameters !');

  if(time < 60) callback(false, 406, 'ERROR : time may not be less than a minute !');
  if(time > 3153600000) callback(false, 406, 'ERROR : time may not be up than a hundred of years !');

  functions.convertSecondsToDate(time, function(date, code, message)
  {
    date == false ? callback(false, code, message) :

    database.insertIntoDatabase('blacklist', {"account": identifier, "end": date}, connection, function(result, code, message)
    {
      result == false ? callback(false, code, message) : callback(true);
    });
  });
}

/****************************************************************************************************/

//See 'blacklist.md' line 22.

blacklist.unSuspendAccount = function(identifier, connection, callback)
{
  identifier == undefined ? callback(false, 406, 'ERROR : account identifier is missing !') :

  database.deleteFromDatabase('blacklist', {"account": identifier}, undefined, connection, function(result, code, message)
  {
    result == false ? callback(false, code, message) : callback(true);
  });
}

/****************************************************************************************************/

//See 'blacklist.md' line 40.

blacklist.checkIfAccountIsBlacklisted = function(identifier, connection, callback)
{
  identifier == undefined || connection == undefined ? callback(false, 406, 'ERROR : missing data in the query !') :
    
  database.getFromDatabase('blacklist', ['end'], {"account": identifier}, undefined, connection, function(result, code, message)
  {
    result == false ? callback(false, code, message) : callback(result);
  });  
}

/****************************************************************************************************/
