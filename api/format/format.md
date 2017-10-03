/****************************************************************************************************/

checkEmailFormat(str, callback) :

  Arguments :

    - str : a string that must be checked by the function.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'true' if the string passed the checking or 'false' if it did not. Return 'undefined' if the string given in paramater is undefined.

  Description :

    Get a string that must be an email, the function checks it using a regex and return 'true' if the format is good or 'false' if it is not.

/****************************************************************************************************/

checkUsernameFormat(str, callback) :

  Arguments :

    - str : a string that must be checked by the function.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'true' if the string passed the checking or 'false' if it did not. Return 'undefined' if the string given in paramater is undefined.

  Description :

    Get a string that must be a valid username (no special characters, no spaces, six characters at least and no more than thirty), the function checks it using a regex and return 'true' if the format is good or 'false' if it is not.

/****************************************************************************************************/

checkPasswordFormat(str, callback) :

  Arguments :

    - str : a string that must be checked by the function.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'true' if the string passed the checking or 'false' if it did not. Return 'undefined' if the string given in paramater is undefined.

  Description :

    Get a string that must be a valid password (no spaces, height characters at least and no more than thirty, digit and uppercase required), the function checks it using a regex and return 'true' if the format is good or 'false' if it is not.

/****************************************************************************************************/

checkBirthdateFormat(str, callback) :

  Arguments :

    - str : a string that is the birthdate that must be under this format YYYY-MM-DD.
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : if the format of the date is good and respects the limits.
    - 'false' : format is invalid or the date does not exist (1990-13-54).

  Description :

    Get a date YYYY-MM-DD and check if there is no error in it and if the format is respected.

/****************************************************************************************************/

checkGenderFormat(gender, callback) :

  Arguments :

    - gender : an integer that represents a gender.
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : if the identifier exists for a gender.
    - 'false' : format is invalid or the gender option does not exist in the list.

  Description :

    Get an integer that represents a gender from 'gender.json' and check if the gender using this identifier exists.

/****************************************************************************************************/

checkCountryFormat(country, callback) :

  Arguments :

    - country : a string that represents the country.
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : if the identifier exists for a country.
    - 'false' : format is invalid or the country option does not exist in the list.

  Description :

    Get a string that is the country in english and check if it exists in 'countries.json'.

/****************************************************************************************************/

checkCountyFormat(country, county, callback) :

  Arguments :

    - country : a string that represents the country.
    - county : a string that respresents the county identifier.
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : if the identifier exists for the county.
    - 'false' : format is invalid or the country/county option does not exist in the list.

  Description :

    Get a string that is the country in english and check if it exists in 'countries.json', then check if the identifier given for the county can be found in the list for the current country provided.

/****************************************************************************************************/
