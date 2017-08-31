'use strict'

let Subscription = module.exports = {};

/****************************************************************************************************/

//See 'subscription.md' line 3.

Subscription.checkForMissingDataInSubscriptionObject = function(object, callback)
{
  if(object['username'] == undefined || object['email'] == undefined || object['password'] == undefined || object['confirmPassword'] == undefined || object['address'] == undefined || object['postalCode'] == undefined || object['city'] == undefined)
  {
    callback(false);
  }

  else
  {
    callback(true);
  }
}

/****************************************************************************************************/
