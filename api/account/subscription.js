'use strict';


const fs          = require('fs');
const bcrypt      = require('bcrypt');

let Subscription = module.exports = {};

/****************************************************************************************************/

//See 'subscription.md' line 3.

Subscription.checkForMissingDataInSubscriptionObject = function(object, callback)
{
  if(object['username'] == undefined){ callback(false, 'ERROR : username is missing !'); }
  if(object['password'] == undefined){ callback(false, 'ERROR : password is missing !'); }
  if(object['confirmPassword'] == undefined){ callback(false, 'ERROR : password confirmation is missing !'); }
  if(object['email'] == undefined){ callback(false, 'ERROR : email is missing !'); }
  if(object['county'] == undefined){ callback(false, 'ERROR : county is missing !'); }
  if(object['gender'] == undefined){ callback(false, 'ERROR : gender is missing !'); }
  if(object['birthdate'] == undefined){ callback(false, 'ERROR : birthdate is missing !'); }

  callback(true, undefined);
}

/****************************************************************************************************/

//See 'subscription.md' line 20.

Subscription.checkIfPasswordAndConfirmationMatch = function(password, confirmation, callback)
{
  if(password == undefined){ callback(false, 'ERROR : password is missing !'); }
  if(confirmation == undefined){ callback(false, 'ERROR : confirmation password is missing !'); }

  if(password != confirmation)
  {
    callback(false, 'ERROR : the passwords are different !');
  }

  else
  {
    callback(true);
  }
}

/****************************************************************************************************/

//See 'subscription.md' line 38.

Subscription.putAccountInTheDatabase = function(object, connection, callback)
{
  if(object == undefined){ callback(false, 'ERROR : account data are missing !'); }
  if(connection == undefined){ callback(false, 'ERROR : sql connector is missing !'); }

  connection.query(`INSERT INTO account (username, email, password, county, gender, birthdate, activated) VALUES ("${object['username']}", "${object['email']}", "${object['password']}", "${object['county']}", "${object['gender']}", "${object['birthdate']}", 0)`, function(err, result)
  {
    if(err)
    {
      callback(false, 'ERROR : ' + err + ' !');
    }

    else
    {
      callback(true, undefined);
    }
  });
}

/****************************************************************************************************/

//See 'subscription.md' line 56.

Subscription.encryptPassword = function(salt, password, callback)
{
  if(salt == undefined){ callback(false, 'ERROR : salt is missing !'); }
  if(password == undefined){ callback(false, 'ERROR : password is missing !'); }

  bcrypt.hash(password, salt, function(err, hash)
  {
    if(err)
    {
      callback(false, 'ERROR : ' + err + ' !');
    }

    else
    {
      callback(hash);
    }
  });
}

/****************************************************************************************************/

//See 'subscription.md' line 74.

Subscription.checkIfUsernameIsNotAlreadyTaken = function(username, connection, callback)
{
  if(email == undefined){ callback(false, 'ERROR : email is missing !'); }
  if(connection == undefined){ callback(false, 'ERROR : sql connector is missing !'); }

  connection.query(`SELECT id FROM account WHERE username = "${username}"`, function(err, result)
  {
    if(err)
    {
      callback(false, 'ERROR : ' + err + ' !');
    }

    else
    {
      if(result.length > 0)
      {
        callback(true);
      }

      else
      {
        callback(undefined);
      }
    }
  });
}

/****************************************************************************************************/

//See 'subscription.md' line 92.

Subscription.checkIfEmailIsNotAlreadyTaken = function(email, connection, callback)
{
  if(email == undefined){ callback(false, 'ERROR : email is missing !'); }
  if(connection == undefined){ callback(false, 'ERROR : sql connector is missing !'); }

  connection.query(`SELECT id FROM account WHERE email = "${email}"`, function(err, result)
  {
    if(err)
    {
      callback(false, 'ERROR : ' + err + ' !');
    }

    else
    {
      if(result.length > 0)
      {
        callback(true);
      }

      else
      {
        callback(undefined);
      }
    }
  });
}

/****************************************************************************************************/

//See 'subscription.md' line 110.

Subscription.getCountriesList = function(callback)
{
  fs.readFile('../../json/countries.json', function(err, data)
  {
    if(err)
    {
      callback(false, 'ERROR : ' + err + ' !');
    }

    else
    {
      let json = JSON.parse(data);

      if(json == undefined)
      {
        callback(false, 'ERROR : could not parse data !');
      }

      else
      {
        callback(json);
      }
    }
  });
}

/****************************************************************************************************/

//See 'subscription.md' line 126.

Subscription.getCountiesList = function(country, callback)
{
  if(country == undefined){ callback(false, 'ERROR : country is missing !'); }

  fs.readFile('../../json/countries.json', function(err, data)
  {
    if(err)
    {
      callback(false, 'ERROR : ' + err + ' !');
    }

    else
    {
      let json = JSON.parse(data);

      if(json == undefined)
      {
        callback(false, 'ERROR : could not parse data !');
      }

      else
      {
        if(json['countries'][country] == undefined)
        {
          callback(false, 'ERROR : could not find country in the list !');
        }

        else
        {
          callback(json['countries'][country]);
        }
      }
    }
  });
}

/****************************************************************************************************/

//See 'subscription.md' line 143.

Subscription.suspendAccount = function(email, connection, callback)
{
  if(email == undefined){ callback(false, 'ERROR : email is missing !'); }
  if(connection == undefined){ callback(false, 'ERROR : sql connector is missing !'); }

  connection.query(`UPDATE account SET activated = 0 WHERE email = "${email}"`, function(err, data)
  {
    if(err)
    {
      callback(false, 'ERROR : ' + err + ' !');
    }

    else
    {
      callback(true, undefined);
    }
  });
}

/****************************************************************************************************/

//See 'subscription.md' line 161.

Subscription.rehabilitateAccount = function(email, connection, callback)
{
  if(email == undefined){ callback(false, 'ERROR : email is missing !'); }
  if(connection == undefined){ callback(false, 'ERROR : sql connector is missing !'); }

  connection.query(`UPDATE account SET activated = 1 WHERE email = "${email}"`, function(err, data)
  {
    if(err)
    {
      callback(false, 'ERROR : ' + err + ' !');
    }

    else
    {
      callback(true, undefined);
    }
  });
}

/****************************************************************************************************/
