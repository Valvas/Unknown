/****************************************************************************************************/

checkForMissingDataInSubscriptionObject(object, callback) :

  Arguments :

    - object : a JSON object with user informations entered in the subscription form (need 'username', 'email', 'password', 'confirmPassword', 'address', 'postalCode', 'city').
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
