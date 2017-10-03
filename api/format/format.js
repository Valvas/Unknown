'use strict';

const fs = require('fs');

let format = module.exports = {};

/****************************************************************************************************/

//See 'format.md' line 3.

format.checkEmailFormat = function(str, callback)
{
  if(str == undefined)
  {
    callback(false, 406, 'ERROR : no email provided !');
  }

  else
  {
    if(new RegExp("^[a-zA-Z][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$").test(str) == false)
    {
      callback(false, 406, 'ERROR : invalid format !');
    }

    else
    {
      callback(true);
    }
  }
}

/****************************************************************************************************/

//See 'format.md' line 37.

format.checkPasswordFormat = function(str, callback)
{
  if(str == undefined)
  {
    callback(false, 406, 'ERROR : no password provided !');
  }

  else
  {
    fs.readFile('./json/format.json', function(err, data)
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
          callback(false, 500, 'ERROR : ' + err.message + ' !');
        }

        else
        {
          let check = true;

          if(json['subscription']['password']['min-length'] != false){ if(str.length < json['subscription']['password']['min-length']){ check = false; } }
          if(json['subscription']['password']['max-length'] != false){ if(str.length > json['subscription']['password']['max-length']){ check = false; } }

          if(json['subscription']['password']['required-digit'] == true){ if(str.match(/\d/) == null){ check = false; } }
          if(json['subscription']['password']['authorized-digit'] == false){ if(str.match(/\d/) != null){ check = false; } }

          if(json['subscription']['password']['required-spaces'] == true){ if(str.match(/\s/) == null){ check = false; } }
          if(json['subscription']['password']['authorized-spaces'] == false){ if(str.match(/\s/) != null){ check = false; } }

          if(json['subscription']['password']['required-lowercase'] == true){ if(str.toUpperCase() == str){ check = false; } }
          if(json['subscription']['password']['authorized-lowercase'] == false){ if(str.toUpperCase() != str){ check = false; } }

          if(json['subscription']['password']['required-uppercase'] == true){ if(str.toLowerCase() == str){ check = false; } }
          if(json['subscription']['password']['authorized-uppercase'] == false){ if(str.toLowerCase() != str){ check = false; } }

          if(json['subscription']['password']['required-special'] == true){ if(str.match(/[^\s\w]/) == null){ check = false; } }
          if(json['subscription']['password']['authorized-special'] == false){ if(str.match(/[^\s\w]/) != null){ check = false; } }

          if(check == false)
          {
            callback(false, 406, 'ERROR : invalid format !');
          }

          else
          {
            callback(true);
          }
        }
      }
    });
  }
}

/****************************************************************************************************/

//See 'format.md' line 20.

format.checkUsernameFormat = function(str, callback)
{
  if(str == undefined)
  {
    callback(false, 406, 'ERROR : no username provided !');
  }

  else
  {
    fs.readFile('./json/format.json', function(err, data)
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
          callback(false, 500, 'ERROR : ' + err.message + ' !');
        }

        else
        {
          let check = true;

          if(json['subscription']['username']['min-length'] != false){ if(str.length < json['subscription']['username']['min-length']){ check = false; } }
          if(json['subscription']['username']['max-length'] != false){ if(str.length > json['subscription']['username']['max-length']){ check = false; } }

          if(json['subscription']['username']['required-digit'] == true){ if(str.match(/\d/) == null){ check = false; } }
          if(json['subscription']['username']['authorized-digit'] == false){ if(str.match(/\d/) != null){ check = false; } }

          if(json['subscription']['username']['required-spaces'] == true){ if(str.match(/\s/) == null){ check = false; } }
          if(json['subscription']['username']['authorized-spaces'] == false){ if(str.match(/\s/) != null){ check = false; } }

          if(json['subscription']['username']['required-lowercase'] == true){ if(str.toUpperCase() == str){ check = false; } }
          if(json['subscription']['username']['authorized-lowercase'] == false){ if(str.toUpperCase() != str){ check = false; } }

          if(json['subscription']['username']['required-uppercase'] == true){ if(str.toLowerCase() == str){ check = false; } }
          if(json['subscription']['username']['authorized-uppercase'] == false){ if(str.toLowerCase() != str){ check = false; } }

          if(json['subscription']['username']['required-special'] == true){ if(str.match(/[^\s\w]/) == null){ check = false; } }
          if(json['subscription']['username']['authorized-special'] == false){ if(str.match(/[^\s\w]/) != null){ check = false; } }

          if(check == false)
          {
            callback(false, 406, 'ERROR : invalid format !');
          }

          else
          {
            callback(true);
          }
        }
      }
    });
  }
}

/****************************************************************************************************/

//See 'format.md' line 54.

format.checkBirthdateFormat = function(str, callback)
{
  if(new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}").test(str) == false)
  {
    callback(false, 401, 'ERROR : invalid format, it must be YYYY-MM-DD !');
  }

  else
  {
    let day = parseInt(str.substr(8, 2));
    let year = parseInt(str.substr(0, 4));
    let month = parseInt(str.substr(5, 2));

    fs.readFile('./json/format.json', function(err, data)
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
          callback(false, 500, 'ERROR : could not parse data from \"format.json\" !');
        }

        else
        {
          if(json['subscription']['birthdate'] == undefined)
          {
            callback(false, 500, 'ERROR : could not find \"birthdate\" in \"format.json\" !');
          }

          else
          {
            if(year < json['subscription']['birthdate']['min-year'])
            {
              callback(false, 401, 'ERROR : birth year cannot be under ' + json['subscription']['birthdate']['min-year'] + ' !');
            }

            else if(year > json['subscription']['birthdate']['max-year'])
            {
              callback(false, 401, 'ERROR : birth year cannot be upper than ' + json['subscription']['birthdate']['max-year'] + ' !');
            }

            else
            {
              if(month < 1 || month > 12)
              {
                callback(false, 401, 'ERROR : month must be between 01 and 12 !');
              }

              else if(day < 1 || day > 31)
              {
                callback(false, 401, 'ERROR : day must be between 01 and 31 !');
              }

              else
              {
                switch(month)
                {
                  case 2 :

                    if(day > 29)
                    {
                      callback(false, 401, 'ERROR : there is no day ' + day + ' in february !');
                    }

                    else if(day == 29 && year % 4 != 0)
                    {
                      callback(false, 401, 'ERROR : there was no day 29 in february in the year ' + year + ' !');
                    }

                    else
                    {
                      callback(true);
                    }

                  break;

                  case 4 :

                    if(day > 30)
                    {
                      callback(false, 401, 'ERROR : there is no more than 30 days in april !');
                    }

                    else
                    {
                      callback(true);
                    }

                  break;

                  case 6 :

                    if(day > 30)
                    {
                      callback(false, 401, 'ERROR : there is no more than 30 days in june !');
                    }

                    else
                    {
                      callback(true);
                    }

                  break;

                  case 9 :

                    if(day > 30)
                    {
                      callback(false, 401, 'ERROR : there is no more than 30 days in september !');
                    }
                    else
                    {
                      callback(true);
                    }

                  break;

                  case 11 :

                    if(day > 30)
                    {
                      callback(false, 401, 'ERROR : there is no more than 30 days in november !');
                    }

                    else
                    {
                      callback(true);
                    }

                  break;

                  default :

                    callback(true);

                  break;
                }
              }
            }
          }
        }
      }
    });
  }
}

/****************************************************************************************************/

//See 'format.md' line 72.

format.checkGenderFormat = function(gender, callback)
{
  if(gender == undefined)
  {
    callback(false, 406, 'ERROR : no gender indentifier provided !');
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
          callback(false, 500, 'ERROR : cannot parse data from \"gender.json\" !');
        }

        else
        {
          if(json[gender] == undefined)
          {
            callback(false, 406, 'ERROR : no gender found using the identifier provided !');
          }

          else
          {
            callback(true);
          }
        }
      }
    });
  }
}

/****************************************************************************************************/

//See 'format.md' line 90.

format.checkCountryFormat = function(country, callback)
{
  if(country == undefined)
  {
    callback(false, 406, 'ERROR : no country provided !');
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
          callback(false, 500, 'ERROR : cannot parse data from \"countries.json\" !');
        }

        else
        {
          if(json[country] == undefined)
          {
            callback(false, 406, 'ERROR : no country found using the string provided !');
          }

          else
          {
            callback(true);
          }
        }
      }
    });
  }
}

/****************************************************************************************************/

//See 'format.md' line 108.

format.checkCountyFormat = function(country, county, callback)
{
  if(country == undefined)
  {
    callback(false, 406, 'ERROR : no country indentifier provided !');
  }

  else if(county == undefined)
  {
    callback(false, 406, 'ERROR : no county indentifier provided !');
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
          callback(false, 500, 'ERROR : cannot parse data from \"countries.json\" !');
        }

        else
        {
          if(json[country] == undefined)
          {
            callback(false, 406, 'ERROR : no country found using the identifier provided !');
          }

          else
          {
            if(json[country][county] == undefined)
            {
              callback(false, 406, 'ERROR : no county found for the current country using the identifier provided !');
            }

            else
            {
              callback(true);
            }
          }
        }
      }
    });
  }
}

/****************************************************************************************************/
