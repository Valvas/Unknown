'use strict';

const functions = require('../functions');

let logon = module.exports = {};

/****************************************************************************************************/

//See 'logon.md' line 3.

logon.authenticateAccount = function(email, password, salt, connection, callback)
{
  if(email == undefined){ callback(false, 406, 'ERROR : no email provided !'); }
  if(password == undefined){ callback(false, 406, 'ERROR : no password provided !'); }
  if(connection == undefined){ callback(false, 406, 'ERROR : no sql connector provided !'); }

  functions.encryptPassword(salt, password, function(hash, code, message)
  {
    if(hash == false)
    {
      callback(false, code, message);
    }

    else
    {
      connection.query(`SELECT number FROM account WHERE email = "${email}" AND password = "${hash}"`, function(err, result)
      {
        if(err)
        {
          callback(false, 500, 'ERROR : ' + err.message + ' !');
        }

        else
        {
          if(result.length > 0)
          {
            callback(true, result[0]['number']);
          }

          else
          {
            callback(undefined);
          }
        }
      });
    }
  });
}

/****************************************************************************************************/
