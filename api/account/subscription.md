/****************************************************************************************************/

checkForMissingDataInSubscriptionObject(object, callback) :

  Arguments :

    - object : a JSON object with user informations entered in the subscription form (need 'username', 'email', 'password', 'confirmPassword', 'county', 'gender', 'birthdate').
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'true' if data have been well provided or 'false' if data are missing.

  Description :

    Check if the JSON object given in parameter has all the data required for subscription.

/****************************************************************************************************/

checkIfPasswordAndConfirmationMatch(password, confirmation, callback) :

  Arguments :

    - password : a string that is user password provided.
    - confirmation : a string that must be the same as the password provided.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'true' if the password and its confirmation match or 'false' if they do not match, return 'undefined' if one of the password is missing.

  Description :

    Check if the confirmation password provided match the password given by user.

/****************************************************************************************************/

putAccountInTheDatabase(object, connection, callback) :

  Arguments :

    - object : a JSON object that contains user's data.
    - connection : a database connector used to execute queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'true' if query to the database succedeed or 'false' if an error occured, return 'undefined' if data are missing or if the database connector does not exist.

  Description :

    Prepare and execute a SQL query to add user's account in the database.

/****************************************************************************************************/

encryptPassword(salt, password, callback) :

  Arguments :

    - salt : a string that is the encryption key used to encrypt passwords.
    - password : a string that is the password to encrypt.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return the password hashed in case of success, 'false' in case of error and 'undefined' if the password or the salt is missing in the request.

  Description :

    Encrypt the password given in parameter and return it to the calling function.

/****************************************************************************************************/

checkIfUsernameIsNotAlreadyTaken(username, connection, callback) :

  Arguments :

    - username : a string that is the username that must not be already in the database.
    - connection : a database connector used to execute queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'true' if the username has been found in the database and is already taken, 'false' in case of error and 'undefined' is the username has not been found.

  Description :

    Check if the username picked by user is not already in the database.

/****************************************************************************************************/

checkIfEmailIsNotAlreadyTaken(email, connection, callback) :

  Arguments :

    - email : a string that is the email address that must not be already in the database.
    - connection : a database connector used to execute queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'true' if the email has been found in the database and is already taken, 'false' in case of error and 'undefined' is the email has not been found.

  Description :

    Check if the email address picked by user is not already in the database.

/****************************************************************************************************/

getCountriesList(callback) :

  Arguments :

    - callback : just here to inform that the function returns something.

  Return :

    - callback : return a JSON object with the content of the file in case of success. In case of error return 'undefined'.

  Description :

    Get the list of the countries that can be selected at the subscription.

/****************************************************************************************************/

getCountiesList(country, callback) :

  Arguments :

    - country : a string that is the country that the counties are requested.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return a JSON object with the content of the file in case of success. In case of error return 'undefined'.

  Description :

    Get the list of the counties that can be selected at the subscription for the given country.

/****************************************************************************************************/

suspendAccount(email, connection, callback) :

  Arguments :

    - email : a string that is the email linked to the account that must be suspended.
    - connection : a database connector used to execute queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'undefined' if the account could not be found, 'true' if the account has been suspended and 'false' if the function failed.

  Description :

    Put the field 'activated' to 0 for the account linked to the email given in argument (the account cannot be used anymore).

/****************************************************************************************************/

rehabilitateAccount(email, connection, callback) :

  Arguments :

    - email : a string that is the email linked to the account that must be rehabilitated.
    - connection : a database connector used to execute queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'undefined' if the account could not be found, 'true' if the account has been rehabilitated and 'false' if the function failed.

  Description :

    Put the field 'activated' to 1 for the account linked to the email given in argument (the account can now be used).
    
/****************************************************************************************************/
