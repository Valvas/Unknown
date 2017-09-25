'use strict';

let Blacklist = module.exports = {};

/****************************************************************************************************/

//See 'blacklist.md' line 3.

Blacklist.suspendAccountForGivenTime = function(email, time, connection, callback)
{
  if(email == undefined){ callback(false, 'ERROR : email is missing !'); }
  if(time == undefined){ callback(false, 'ERROR : time is missing !'); }
  if(connection == undefined){ callback(false, 'ERROR : sql connector is missing !'); }

  if(new RegExp("^[a-zA-Z][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$").test(email) == false)
  {
    callback(false, 'ERROR : email address\' format is invalid !');
  }

  if(time < 60){ callback(false, 'ERROR : time may not be less than a minute !'); }
  if(time > 31536000){ callback(false, 'ERROR : time may not be up than a year !'); }
}

/****************************************************************************************************/
