'use strict';

const fs = require('fs');
const functions = require('../functions');

let subscription = module.exports = {};

/****************************************************************************************************/

//See 'subscription.md' line 3.

subscription.checkForMissingDataInSubscriptionObject = function(object, callback)
{
  if(object['username'] == undefined){ callback(false, 406, 'ERROR : username is missing !'); }
  else if(object['password'] == undefined){ callback(false, 406, 'ERROR : password is missing !'); }
  else if(object['confirmPassword'] == undefined){ callback(false, 406, 'ERROR : password confirmation is missing !'); }
  else if(object['email'] == undefined){ callback(false, 406, 'ERROR : email is missing !'); }
  else if(object['country'] == undefined){ callback(false, 406, 'ERROR : country is missing !'); }
  else if(object['county'] == undefined){ callback(false, 406, 'ERROR : county is missing !'); }
  else if(object['gender'] == undefined){ callback(false, 406, 'ERROR : gender is missing !'); }
  else if(object['birthdate'] == undefined){ callback(false, 406, 'ERROR : birthdate is missing !'); }

  else
  {
    callback(true);
  }
}

/****************************************************************************************************/

//See 'subscription.md' line 21.

subscription.checkIfPasswordAndConfirmationMatch = function(password, confirmation, callback)
{
  if(password == undefined){ callback(false, 406, 'ERROR : password is missing !'); }
  if(confirmation == undefined){ callback(false, 406, 'ERROR : confirmation password is missing !'); }

  if(password != confirmation)
  {
    callback(false, 406, 'ERROR : the passwords are different !');
  }

  else
  {
    callback(true);
  }
}

/****************************************************************************************************/

//See 'subscription.md' line 40.

subscription.putAccountInTheDatabase = function(object, salt, connection, callback)
{
  if(object == undefined){ callback(false, 406, 'ERROR : account data are missing !'); }
  if(connection == undefined){ callback(false, 406, 'ERROR : sql connector is missing !'); }

  functions.encryptPassword(salt, object['password'], function(hash, code, message)
  {
    if(hash == false)
    {
      callback(false, code, message);
    }

    else
    {
      connection.query(`INSERT INTO account (username, email, password, country, county, gender, birthdate, activated) VALUES ("${object['username']}", "${object['email']}", "${hash}", "${object['country']}", "${object['county']}", "${object['gender']}", "${object['birthdate']}", 0)`, function(err, account)
      {
        if(err)
        {
          callback(false, 500, 'ERROR : ' + err.message + ' !');
        }

        else
        {
          if(account.insertId == undefined)
          {
            callback(false, 500, 'ERROR : account could not be created !');
          }

          else
          {
            connection.query(`UPDATE account SET number = MD5(${account.insertId}) WHERE id = ${account.insertId}`, function(err, result)
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

//See 'subscription.md' line 80.

subscription.checkIfUsernameIsNotAlreadyTaken = function(username, connection, callback)
{
  if(email == undefined){ callback(false, 406, 'ERROR : email is missing !'); }
  if(connection == undefined){ callback(false, 406, 'ERROR : sql connector is missing !'); }

  connection.query(`SELECT id FROM account WHERE username = "${username}"`, function(err, result)
  {
    if(err)
    {
      callback(false, 500, 'ERROR : ' + err.message + ' !');
    }

    else
    {
      if(result.length > 0)
      {
        callback(true, 406, 'ERROR : username already in use !');
      }

      else
      {
        callback(undefined);
      }
    }
  });
}

/****************************************************************************************************/

//See 'subscription.md' line 100.

subscription.checkIfEmailIsNotAlreadyTaken = function(email, connection, callback)
{
  if(email == undefined){ callback(false, 406, 'ERROR : email is missing !'); }
  if(connection == undefined){ callback(false, 406, 'ERROR : sql connector is missing !'); }

  connection.query(`SELECT id FROM account WHERE email = "${email}"`, function(err, result)
  {
    if(err)
    {
      callback(false, 500, 'ERROR : ' + err.message + ' !');
    }

    else
    {
      if(result.length > 0)
      {
        callback(true, 406, 'ERROR : email already in use !');
      }

      else
      {
        callback(undefined);
      }
    }
  });
}

/****************************************************************************************************/

//See 'subscription.md' line 120.

subscription.getCountriesList = function(callback)
{
  fs.readFile('./json/countries.json', function(err, data)
  {
    if(err)
    {
      callback(false, 500, 'ERROR : ' + err.message + ' !');
    }

    else
    {
      let json = JSON.parse(data);

      if(json == undefined)
      {
        callback(false, 500, 'ERROR : could not parse data !');
      }

      else
      {
        callback(json);
      }
    }
  });
}

/****************************************************************************************************/

//See 'subscription.md' line 137.

subscription.getCountiesList = function(country, callback)
{
  if(country == undefined)
  {
    callback(false, 406, 'ERROR : country is missing !');
  }

  else
  {
    fs.readFile('./json/countries.json', function(err, data)
    {
      if(err)
      {
        callback(false, 500, 'ERROR : ' + err.message + ' !');
      }

      else
      {
        let json = JSON.parse(data);

        if(json == undefined)
        {
          callback(false, 500, 'ERROR : could not parse data !');
        }

        else
        {
          if(json[country] == undefined)
          {
            callback(false, 406, 'ERROR : could not find country in the list !');
          }

          else
          {
            callback(json[country]);
          }
        }
      }
    });
  }
}

/****************************************************************************************************/

//See 'subscription.md' line 155.

subscription.suspendAccount = function(account, connection, callback)
{
  if(account == undefined){ callback(false, 406, 'ERROR : account ID is missing !'); }
  if(connection == undefined){ callback(false, 406, 'ERROR : sql connector is missing !'); }

  connection.query(`UPDATE account SET activated = 0 WHERE number = "${account}"`, function(err, data)
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

/****************************************************************************************************/

//See 'subscription.md' line 174.

subscription.rehabilitateAccount = function(account, connection, callback)
{
  if(account == undefined){ callback(false, 406, 'ERROR : account ID is missing !'); }
  if(connection == undefined){ callback(false, 406, 'ERROR : sql connector is missing !'); }

  connection.query(`UPDATE account SET activated = 1 WHERE number = "${account}"`, function(err, data)
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

/****************************************************************************************************/
