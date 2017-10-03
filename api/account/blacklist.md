/****************************************************************************************************/

suspendAccountForGivenTime(account, time, connection, callback) :

  Arguments :

    - account : a string that is the encrypted ID linked to the account to suspend.
    - time : an integer that is the amount of seconds to suspend the account.
    - connection : a database connector to execute queries in the database.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'false' in case of error with a message that tells what is the error, or 'true' in case of success.

  Description :

    Suspend the account linked to the email given as parameter for the time in seconds given as paramater.

/****************************************************************************************************/

unSuspendAccount(account, connection, callback) :

  Arguments :

    - account : a string that is the encrypted ID linked to the account to un-suspend.
    - connection : a database connector to execute queries in the database.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'false' in case of error with a message that tells what is the error, or 'true' in case of success.

  Description :

    Un-suspend the account linked to the email given as parameter.

/****************************************************************************************************/

checkIfAccountIsBlacklisted(account, connection, callback) :

  Arguments :

    - account : a string that is the encrypted ID linked to the account to check.
    - connection : a sql connector to perform queries in the database.
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : account is blacklisted, return also a second parameterer that is the end date.
    - 'false' : account is not blacklisted or an error occured, check the HTTP code returned with the callback.

  Description :

    Check in the database if the account given in parameters is blacklisted and return the end date if it is.

/****************************************************************************************************/
