/****************************************************************************************************/

modifyEmail(email, account, connection, callback) :

  Arguments :

    - email : a string that is the new email to associate to the account.
    - account : an integer that is the id of the account to modify.
    - connection : a sql connector to perform queries in the database.

  Return :

    - 'true' : email has been well modified.
    - 'false' : data are missing or an error occured, return also a message to inform what is the error.

  Description :

    Modify the email associated to the account number given as parameter.

/****************************************************************************************************/

modifyUsername(username, account, connection, callback) :

  Arguments :

    - username : a string that is the new username to associate to the account.
    - account : an integer that is the id of the account to modify.
    - connection : a sql connector to perform queries in the database.

  Return :

    - 'true' : username has been well modified.
    - 'false' : data are missing or an error occured, return also a message to inform what is the error.

  Description :

    Modify the username associated to the account number given as parameter.

/****************************************************************************************************/

modifyPassword(account, oldPassword, newPassword, passwordConfirmation, salt, connection, callback) :

  Arguments :

    - account : an identifier for the account to modify the password.
    - oldPassword : a string that is the current non-encrypted password.
    - newPassword : a string that is the new password to encrypt and put in the database.
    - passwordConfirmation : a string that must be the same as the new password.
    - salt : a string that is used to encrypt passwords.
    - connection : a sql connector to perform queries to the database.
    - callback : just here to inform that the function returns something.

  Return :

    - 'true' : the password has been modified.
    - 'false' : an error occured, return also a http code and a message.

  Description :

    Function to modify the password linked to the account identifier provided in the query. Encrypt the current password provided and check if it is the same as the encrypted password in the database. Then check if the format of the new password is good. Check if the new password and its confirmation are the same. Put the new password in the database.

/****************************************************************************************************/
