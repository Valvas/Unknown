'use strict';

const bcrypt = require('bcrypt');

let functions = module.exports = {};

/****************************************************************************************************/

//See 'functions.md' line 3.

functions.convertSecondsToDate = function(time, callback)
{
  if(time == undefined)
  {
    callback(false, 406, 'ERROR : time is missing !');
  }

  else
  {
    time = parseInt(time);

    let date = new Date(Date.now() + (time * 1000));
    let str = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    callback(str);
  }
}

/****************************************************************************************************/

//See 'subscription.md' line 56.

functions.encryptPassword = function(salt, password, callback)
{
  if(salt == undefined){ callback(false, 406, 'ERROR : salt is missing !'); }
  if(password == undefined){ callback(false, 406, 'ERROR : password is missing !'); }

  bcrypt.hash(password, salt, function(err, hash)
  {
    if(err)
    {
      callback(false, 500, 'ERROR : ' + err.message + ' !');
    }

    else
    {
      callback(hash);
    }
  });
}

/****************************************************************************************************/

//See 'functions.md' line 20.

functions.getRemainingTimeFromDate = function(date, callback)
{
  if(date == undefined)
  {
    callback(false, 406, 'ERROR : no date provided !');
  }

  else
  {
    let now = new Date();
    let end = new Date(date);

    let remaining = (end - now) / 1000;
  }
}

/****************************************************************************************************/
