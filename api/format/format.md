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
