'use strict';

let Format = module.exports = {};

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
    fs.readFile('../../json/format.json', function(err, data)
    {
      if(err)
      {
        callback(undefined);
      }

      else
      {
        let json = JSON.parse(data);

        if(json == undefined)
        {
          callback(undefined);
        }

        else
        {
          if(json['subscription']['username']['min-length'] != false){ if(str.length < json['subscription']['username']['min-length']){ callback(false); } }
          if(json['subscription']['username']['max-length'] != false){ if(str.length > json['subscription']['username']['max-length']){ callback(false); } }

          if(json['subscription']['username']['required-digit'] == true){ if(str.match(/\d/) == null){ callback(false); } }
          if(json['subscription']['username']['authorized-digit'] == false){ if(str.match(/\d/) != null){ callback(false); } }

          if(json['subscription']['username']['required-spaces'] == true){ if(str.match(/\s/) == null){ callback(false); } }
          if(json['subscription']['username']['authorized-spaces'] == false){ if(str.match(/\s/) != null){ callback(false); } }

          if(json['subscription']['username']['required-lowercase'] == true){ if(str.toUpperCase() == str){ callback(false); } }
          if(json['subscription']['username']['authorized-lowercase'] == false){ if(str.toUpperCase() != str){ callback(false); } }

          if(json['subscription']['username']['required-uppercase'] == true){ if(str.toLowerCase() == str){ callback(false); } }
          if(json['subscription']['username']['authorized-uppercase'] == false){ if(str.toLowerCase() != str){ callback(false); } }

          if(json['subscription']['username']['required-special'] == true){ if(str.match(/[^\s\w]/) == null){ callback(false); } }
          if(json['subscription']['username']['authorized-special'] == false){ if(str.match(/[^\s\w]/) != null){ callback(false); } }

          callback(true);
        }
      }
    });
  }
}

/****************************************************************************************************/
