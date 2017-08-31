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
