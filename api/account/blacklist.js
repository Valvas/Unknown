'use strict';

const functions = require('../functions');

let blacklist = module.exports = {};

/****************************************************************************************************/

//See 'blacklist.md' line 3.

blacklist.suspendAccountForGivenTime = function(identifier, time, connection, callback)
{
  if(identifier == undefined){ callback(false, 406, 'ERROR : account identifier is missing !'); }
  if(time == undefined){ callback(false, 406, 'ERROR : time is missing !'); }
  if(connection == undefined){ callback(false, 406, 'ERROR : sql connector is missing !'); }

  if(time < 60){ callback(false, 406, 'ERROR : time may not be less than a minute !'); }
  if(time > 3153600000){ callback(false, 406, 'ERROR : time may not be up than a hundred of years !'); }

  functions.convertSecondsToDate(time, function(date, code, message)
  {
    if(date == false)
    {
      callback(false, code, message);
    }

    else
    {
      connection.query(`SELECT end FROM blacklist WHERE account = "${identifier}"`, function(err, result)
      {
        if(err)
        {
          callback(false, 500, 'ERROR : ' + err.message + ' !');
        }

        else
        {
          if(result.length > 0 && result[0]['end'] > date)
          {
            callback(false, 406, 'ERROR : account is already blacklisted for a further date !');
          }

          else
          {
            connection.query(`INSERT INTO blacklist (account, end) VALUES ("${identifier}", ${date})`, function(err, data)
            {
              if(err)
              {
                callback(false, 500, 'ERROR : ' + err.message + ' !');
              }

              else
              {
                callback(true);
              }
            });
          }
        }
      });
    }
  });
}

/****************************************************************************************************/

//See 'blacklist.md' line 22.

blacklist.unSuspendAccount = function(identifier, connection, callback)
{
  if(identifier == undefined)
  {
    callback(false, 406, 'ERROR : account identifier is missing !');
  }

  else
  {
    connection.query(`DELETE FROM blacklist WHERE account = "${identifier}"`, function(err, data)
    {
      if(err)
      {
        callback(false, 500, 'ERROR : ' + err.message + ' !');
      }

      else
      {
        callback(true);
      }
    });
  }
}

/****************************************************************************************************/

//See 'blacklist.md' line 40.

blacklist.checkIfAccountIsBlacklisted = function(identifier, connection, callback)
{
  if(identifier == undefined)
  {
    callback(false, 406, 'ERROR : no account identifier provided !');
  }

  else if(connection == undefined)
  {
    callback(false, 406, 'ERROR : no sql connector provided !');
  }

  else
  {
    connection.query(`SELECT end FROM blacklist WHERE account = "${identifier}" ORDER BY end DESC`, function(err, result)
    {
      if(err)
      {
        callback(false, 500, 'ERROR : ' + err.message + ' !');
      }

      else if(result.length == 0)
      {
        callback(false, 200, 'SUCCESS : account is not blacklisted !');
      }

      else
      {
        callback(true, result[0]['end']);
      }
    });
  }
}

/****************************************************************************************************/
