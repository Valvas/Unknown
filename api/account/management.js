'use strict';

const fs = require('fs');
const functions = require('../functions');
const format = require('../format/format');
const subscription = require('./subscription');

let accountManagement = module.exports = {};

/****************************************************************************************************/

accountManagement.modifyEmail = function(email, account, connection, callback)
{
  if(email == undefined){ callback(false, 406, 'ERROR : email not provided !'); }
  if(account == undefined){ callback(false, 406, 'ERROR : account not provided !'); }
  if(connection == undefined){ callback(false, 406, 'ERROR : sql connector not provided !'); }

  connection.query(`SELECT id FROM account WHERE email = "${email}"`, function(err, result)
  {
    if(err)
    {
      callback(false, 500, 'ERROR : ' + err.message + ' !');
    }

    else if(result.length > 0)
    {
      callback(false, 406, 'ERROR : email address already in use !');
    }

    else
    {
      connection.query(`UPDATE account SET email = "${email}" WHERE number = "${account}"`, function(err, result)
      {
        if(err)
        {
          callback(false, 500, 'ERROR : ' + err.message + ' !');
        }

        else
        {
          if(result.changedRows == 0)
          {
            callback(false, 406, 'ERROR : no account found using the id provided !');
          }

          else
          {
            callback(true);
          }
        }
      });
    }
  });
}

/****************************************************************************************************/

//See 'management.md' line 22.

accountManagement.modifyUsername = function(username, account, connection, callback)
{
  if(account == undefined){ callback(false, 406, 'ERROR : account not provided !'); }
  if(username == undefined){ callback(false, 406, 'ERROR : username not provided !'); }
  if(connection == undefined){ callback(false, 406, 'ERROR : sql connector not provided !'); }

  connection.query(``, function(err, result)
  {
    if(err)
    {
      callback(false, 500, 'ERROR : ' + err.message + ' !');
    }

    else if(result.length > 0)
    {
      callback(false, 406, 'ERROR : username already in use !');
    }

    else
    {
      connection.query(`UPDATE account SET username = "${username}" WHERE number = "${account}"`, function(err, result)
      {
        if(err)
        {
          callback(false, 500, 'ERROR : ' + err.message + ' !');
        }

        else
        {
          if(result.changedRows == 0)
          {
            callback(false, 406, 'ERROR : no account found using the id provided !');
          }

          else
          {
            callback(true);
          }
        }
      });
    }
  });
}

/****************************************************************************************************/

//See 'management.md' line 41.

accountManagement.modifyPassword = function(account, oldPassword, newPassword, passwordConfirmation, salt, connection, callback)
{
  if(salt == undefined){ callback(false, 406, 'ERROR : salt required !'); }
  else if(account == undefined){ callback(false, 406, 'ERROR : account not provided !'); }
  else if(newPassword == undefined){ callback(false, 406, 'ERROR : new password required !'); }
  else if(connection == undefined){ callback(false, 406, 'ERROR : no sql connector provided !'); }
  else if(oldPassword == undefined){ callback(false, 406, 'ERROR : current password required !'); }
  else if(passwordConfirmation == undefined){ callback(false, 406, 'ERROR : password confirmation required !'); }

  else
  {
    functions.encryptPassword(salt, oldPassword, function(hash, code, message)
    {
      if(hash == false)
      {
        callback(false, code, message);
      }

      else
      {
        connection.query(`SELECT id FROM account WHERE number = "${account}" AND password = "${hash}"`, function(err, result)
        {
          if(err)
          {
            callback(false, 500, 'ERROR : ' + err.message + ' !');
          }

          else
          {
            if(result.length == 0)
            {
              callback(false, 406, 'ERROR : the current password does is invalid !');
            }

            else
            {
              format.checkPasswordFormat(newPassword, function(result, code, message)
              {
                if(result == false)
                {
                  callback(false, code, message);
                }

                else
                {
                  subscription.checkIfPasswordAndConfirmationMatch(newPassword, passwordConfirmation, function(result, code, message)
                  {
                    if(result == false)
                    {
                      callback(false, code, message);
                    }

                    else
                    {
                      connection.query(``, function(err, result)
                      {
                        if(err)
                        {
                          callback(false, 500, 'ERROR : ' + err.message + ' !');
                        }

                        else
                        {
                          if(result.changedRows == 0)
                          {
                            callback(false, 500, 'ERROR : password could not be modified for unknown reasons !');
                          }

                          else
                          {
                            callback(true);
                          }
                        }
                      });
                    }
                  });
                }
              });
            }
          }
        });
      }
    });
  }
}

/****************************************************************************************************/

//See 'management.md' line 64.

accountManagement.getUserDataById = function(identifier, connection, callback)
{
  if(identifier == undefined)
  {
    callback(false, 406, 'ERROR : no identifier provided !');
  }

  else if(connection == undefined)
  {
    callback(false, 406, 'ERROR : no sql connector provided !');
  }

  else
  {
    connection.query(`SELECT email, username, gender, birthdate, country, county FROM account WHERE number = "${identifier}"`, function(err, result)
    {
      if(err)
      {
        callback(false, 500, 'ERROR : ' + err.message + ' !');
      }

      else if(result.length == 0)
      {
        callback(false, 406, 'ERROR : no account found using the identifier provided !');
      }

      else if(result.length > 1)
      {
        callback(false, 406, 'ERROR : multiple accounts found using the identifier provided !');
      }

      else
      {
        accountManagement.getGenderFromId(result[0]['gender'], function(result, code, message)
        {
          if(result == false)
          {
            callback(false, code, message);
          }

          else
          {
            result[0]['gender'] = result;
          }
        });
      }
    });
  }
}

/****************************************************************************************************/

//

accountManagement.getGenderFromId = function(identifier, callback)
{
  if(identifier == undefined)
  {
    callback(false, 406, 'ERROR : no gender identifier provided !');
  }

  else
  {
    fs.readFile('./json/gender.json', function(err, data)
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
          callback(false, 500, 'ERROR : could not parse \"gender.json\" !');
        }

        else
        {
          if(json[identifier] == undefined)
          {
            callback(false, 500, 'ERROR : could not find a gender using the identifier provided !');
          }

          else
          {
            callback(json[identifier]);
          }
        }
      }
    });
  }
}

/****************************************************************************************************/

/****************************************************************************************************/

/****************************************************************************************************/
