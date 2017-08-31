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
