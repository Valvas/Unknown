/****************************************************************************************************/

convertSecondsToDate(time, callback) :

  Arguments :

    - time : an integer that is the amount of seconds to suspend the account.
    - callback : just here to inform that the function returns something.

  Return :

    - callback : return 'false' in case of error with a message that tells what is the error, or the date.

  Description :

    Return the date and time when the amount of seconds given as parameter will be reached from the current date and time.

/****************************************************************************************************/

getRemainingTimeFromDate(date, callback) :

  Arguments :

    - date : a date that must not be reached yet.
    - callback : just here to inform that the function returns something.

  Return :

    - time : a string that is the remaining time before the account can be used.
    - 'false' : an error occured, return also a http code and a message.

  Description :

    Return the remaining time bofre the account can be used again.
    
/****************************************************************************************************/
