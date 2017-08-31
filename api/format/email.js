'use strict';

let Format = module.exports = {};

/****************************************************************************************************/

//See 'format.md' line 3.

Format.checkEmailFormat = function(str, callback)
{
  if(str == undefined)
  {
    callback(undefined);
  }

  else
  {
    if(new RegExp("^[a-zA-Z][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$").test(str) == false)
    {
      callback(false);
    }

    else
    {
      callback(true);
    }
  }
}

/****************************************************************************************************/

//See 'format.md' line 20.

Format.checkUsernameFormat = function(str, callback)
{
  if(str == undefined)
  {
    callback(undefined);
  }

  else
  {
    if(str.length < 6 || str.length > 30)
    {
      callback(false);
    }

    else if(str.match(/\s/) != null)
    {
      callback(false);
    }

    else if(str.match(/[^a-zA-Z0-9\s]/) != null)
    {
      callback(false);
    }

    else
    {
      callback(true);
    }
  }
}

/****************************************************************************************************/
