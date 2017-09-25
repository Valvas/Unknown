/****************************************************************************************************/

suspendAccountForGivenTime(email, time, connection, callback) :

  Arguments :

    - email : a string that is the email linked to the account to suspend.
    - time : an integer that is the amount of seconds to suspend the account.
    - connection : a database connector to execute queries in the database.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'false' in case of error with a message that tells what is the error, or 'true' in case of success.

  Description :

    Suspend the account linked to the email given as parameter for the time in seconds given as paramater.

/****************************************************************************************************/
