/****************************************************************************************************/

authenticateAccount(email, password, connection, callback) :

  Arguments :

    - email : a string that is the email address linked to the account to authenticate.
    - password : a string that is the password linked to the account to authenticate.
    - salt : a string that is used in password encryption.
    - connection : a sql connector to perform queries on the database.
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : the account can be authenticated using the credentials provided, return also the identifier of the account.
    - 'false' : an error occured, a message is returned with as a second parameter in the callback.
    - 'undefined': no account found using these credentials.

  Description :

    Try to authenticate an account using the credentials provided as parameters.

/****************************************************************************************************/
