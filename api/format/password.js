'use strict';

let Format = module.exports = {};

/****************************************************************************************************/

//See 'format.md' line 37.

Format.checkPasswordFormat = function(str, callback)
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
          if(json['subscription']['password']['min-length'] != false){ if(str.length < json['subscription']['password']['min-length']){ callback(false); } }
          if(json['subscription']['password']['max-length'] != false){ if(str.length > json['subscription']['password']['max-length']){ callback(false); } }

          if(json['subscription']['password']['required-digit'] == true){ if(str.match(/\d/) == null){ callback(false); } }
          if(json['subscription']['password']['authorized-digit'] == false){ if(str.match(/\d/) != null){ callback(false); } }

          if(json['subscription']['password']['required-spaces'] == true){ if(str.match(/\s/) == null){ callback(false); } }
          if(json['subscription']['password']['authorized-spaces'] == false){ if(str.match(/\s/) != null){ callback(false); } }

          if(json['subscription']['password']['required-lowercase'] == true){ if(str.toUpperCase() == str){ callback(false); } }
          if(json['subscription']['password']['authorized-lowercase'] == false){ if(str.toUpperCase() != str){ callback(false); } }

          if(json['subscription']['password']['required-uppercase'] == true){ if(str.toLowerCase() == str){ callback(false); } }
          if(json['subscription']['password']['authorized-uppercase'] == false){ if(str.toLowerCase() != str){ callback(false); } }

          if(json['subscription']['password']['required-special'] == true){ if(str.match(/[^\s\w]/) == null){ callback(false); } }
          if(json['subscription']['password']['authorized-special'] == false){ if(str.match(/[^\s\w]/) != null){ callback(false); } }

          callback(true);
        }
      }
    });
  }
}

/****************************************************************************************************/
