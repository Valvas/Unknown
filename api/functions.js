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
    if(new RegExp("2([0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])").test(date) == false)
    {
      callback(false, 406, 'ERROR : invalid date format, must be YYYY-MM-DD HH:MM:SS !');
    }

    else
    {
      let now = Date.now();
      let end = new Date(date.substr(0, 4) + "-" + date.substr(5, 2) + "-" + date.substr(8, 2) + "T" + date.substr(11, 2) + ":" + date.substr(14, 2) + ":" + date.substr(17, 2));

      if(now > end)
      {
        callback(false, 406, 'ERROR : end date must no be outdated !');
      }

      else
      {
        let remaining = parseInt((end - now) / 1000);
        
        let years = parseInt(remaining / 31536000);
        remaining -= 31536000 * (parseInt(remaining / 31536000));
        
        let months = parseInt(remaining / 2592000);
        remaining -= 2592000 * (parseInt(remaining / 2592000));
        
        let days = parseInt(remaining / 86400);
        remaining -= 86400 * (parseInt(remaining / 86400));
        
        let hours = parseInt(remaining / 3600);
        remaining -= 3600 * (parseInt(remaining / 3600));
        
        let minutes = parseInt(remaining / 60);
        remaining -= 60 * (parseInt(remaining / 60));
        
        callback({ "years": years, "months": months, "days": days, "hours": hours, "minutes": minutes, "seconds": remaining });
      }
    }
  }
}

/****************************************************************************************************/
