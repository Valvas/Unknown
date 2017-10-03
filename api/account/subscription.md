/****************************************************************************************************/

checkForMissingDataInSubscriptionObject(object, callback) :

  Arguments :

    - object : a JSON object with user informations entered in the subscription form (need 'username', 'email', 'password', 'confirmPassword', 'country', 'county', 'gender', 'birthdate').
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : data have been well provided.
    - 'false' : data are missing, return also a message to inform what is missing.

  Description :

    Check if the JSON object given in parameter has all the data required for subscription.

/****************************************************************************************************/

checkIfPasswordAndConfirmationMatch(password, confirmation, callback) :

  Arguments :

    - password : a string that is user password provided.
    - confirmation : a string that must be the same as the password provided.
    - callback : just here to inform that the function returns something.

  Return :

  - 'true' : the password and its confirmation are the same.
  - 'false' : data are missing or password and its confirmation are different, return also a message to inform what is the error.

  Description :

    Check if the confirmation password provided match the password given by user.

/****************************************************************************************************/

putAccountInTheDatabase(object, salt, connection, callback) :

  Arguments :

    - object : a JSON object that contains user's data.
    - salt : a string that is used to encrypt the password.
    - connection : a database connector used to execute queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : account well created.
    - 'false' : an error occured, return also a second parameter in the callback that is a message to inform what is the error.
    - 'undefined' : data are missing in the object provided or sql connector is missing.

  Description :

    Prepare and execute a SQL query to add user's account in the database.

/****************************************************************************************************/

encryptPassword(salt, password, callback) :

  Arguments :

    - salt : a string that is the encryption key used to encrypt passwords.
    - password : a string that is the password to encrypt.
    - callback : just here to inform that the function returns something.

  Return :

    - hash : return the password hashed in case of success.
    - 'false' : in case of error during the execution, return a second parameter that is the error message.
    - 'undefined' : if the password or the salt used to encrypt are missing.

  Description :

    Encrypt the password given in parameter and return it to the calling function.

/****************************************************************************************************/

checkIfUsernameIsNotAlreadyTaken(username, connection, callback) :

  Arguments :

    - username : a string that is the username that must not be already in the database.
    - connection : a database connector used to execute queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

  - 'true' : the username has been found in the database and is already in use.
  - 'false' : an error occured, return a second parameter that is the error message.
  - 'undefined' : the username or the sql connector is missing in the parameter.

  Description :

    Check if the username picked by user is not already in the database.

/****************************************************************************************************/

checkIfEmailIsNotAlreadyTaken(email, connection, callback) :

  Arguments :

    - email : a string that is the email address that must not be already in the database.
    - connection : a database connector used to execute queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : the email has been found in the database and is already in use.
    - 'false' : an error occured, return a second parameter that is the error message.
    - 'undefined' : the email or the sql connector is missing in the parameter.

  Description :

    Check if the email address picked by user is not already in the database.

/****************************************************************************************************/

getCountriesList(callback) :

  Arguments :

    - callback : just here to inform that the function returns something.

  Return :

    - object : a JSON object with the content of the file in case of success.
    - 'false' : an error occured, return also a second parameter in the callback that is the error message.

  Description :

    Get the list of the countries that can be selected at the subscription.

/****************************************************************************************************/

getCountiesList(country, callback) :

  Arguments :

    - country : a string that is the country that the counties are requested.
    - callback : just here to inform that the function returns something.

  Return :

    - object : a JSON object with all counties from the given country as parameter.
    - 'false' : returned in case of error or missing data, a second parameter is also returned and contains the error message.

  Description :

    Get the list of the counties that can be selected at the subscription for the given country.

/****************************************************************************************************/

suspendAccount(account, connection, callback) :

  Arguments :

    - account : a string that is the encrypted ID linked to the account that must be suspended.
    - connection : a database connector used to execute queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : in case of success.
    - 'false' : in case of error, return also a second parameter in the callback that is the error message.

  Description :

    Put the field 'activated' to 0 for the account linked to the email given as argument (the account cannot be used anymore).

/****************************************************************************************************/

rehabilitateAccount(account, connection, callback) :

  Arguments :

    - account : a string that is the encrypted ID linked to the account that must be rehabilitated.
    - connection : a database connector used to execute queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

  - 'true' : in case of success.
  - 'false' : in case of error, return also a second parameter in the callback that is the error message.

  Description :

    Put the field 'activated' to 1 for the account linked to the email given in argument (the account can now be used).

/****************************************************************************************************/
