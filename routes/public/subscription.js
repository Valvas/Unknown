'use strict';

const express = require('express');
const format = require('../../api/format/format');
const subscription = require('../../api/account/subscription');

let router = express.Router();

/****************************************************************************************************/

//Used to create an account, expects an object in the body with account's data.

router.put('/', function(req, res)
{
  if(req.body.account == undefined)
  {
    res.status(406).send({ 'status' : false, 'message' : 'ERROR : account object required !' });
  }

  else
  {
    subscription.checkForMissingDataInSubscriptionObject(req.body.account, function(result, code, message)
    {
      if(result == false)
      {
        res.status(code).send({ 'status' : false, 'message' : message });
      }

      else
      {
        format.checkEmailFormat(req.body.account['email'], function(result, code, message)
        {
          if(result == false)
          {
            res.status(code).send({ 'return' : false, 'message' : message });
          }

          else
          {
            format.checkUsernameFormat(req.body.account['username'], function(result, code, message)
            {
              if(result == false)
              {
                res.status(code).send({ 'return' : false, 'message' : message });
              }

              else
              {
                format.checkPasswordFormat(req.body.account['password'], function(result, code, message)
                {
                  if(result == false)
                  {
                    res.status(code).send({ 'return' : false, 'message' : message });
                  }

                  else
                  {
                    format.checkCountryFormat(req.body.account['country'], function(result, code, message)
                    {
                      if(result == false)
                      {
                        res.status(code).send({ 'return' : false, 'message' : message });
                      }

                      else
                      {
                        format.checkCountyFormat(req.body.account['country'], req.body.account['county'], function(result, code, message)
                        {
                          if(result == false)
                          {
                            res.status(code).send({ 'return' : false, 'message' : message });
                          }

                          else
                          {
                            format.checkBirthdateFormat(req.body.account['birthdate'], function(result, code, message)
                            {
                              if(result == false)
                              {
                                res.status(code).send({ 'return' : false, 'message' : message });
                              }

                              else
                              {
                                format.checkGenderFormat(req.body.account['gender'], function(result, code, message)
                                {
                                  if(result == false)
                                  {
                                    res.status(code).send({ 'return' : false, 'message' : message });
                                  }

                                  else
                                  {
                                    subscription.checkIfPasswordAndConfirmationMatch(req.body.account['password'], req.body.account['confirmPassword'], function(result, code, message)
                                    {
                                      if(result == false)
                                      {
                                        res.status(code).send({ 'status' : false, 'message' : message });
                                      }

                                      else
                                      {
                                        subscription.checkIfEmailIsNotAlreadyTaken(req.body.account['email'], req.app.get('mysql'), function(result, code, message)
                                        {
                                          if(result == false)
                                          {
                                            res.status(code).send({ 'status' : false, 'message' : message });
                                          }

                                          else if(result == true)
                                          {
                                            res.status(code).send({ 'status' : false, 'message' : message });
                                          }

                                          else
                                          {
                                            subscription.checkIfUsernameIsNotAlreadyTaken(req.body.account['username'], req.app.get('mysql'), function(result, code, message)
                                            {
                                              if(result == false)
                                              {
                                                res.status(code).send({ 'status' : false, 'message' : message });
                                              }

                                              else if(result == true)
                                              {
                                                res.status(code).send({ 'status' : false, 'message' : message });
                                              }

                                              else
                                              {
                                                subscription.putAccountInTheDatabase(req.body.account, req.app.get('salt'), req.app.get('mysql'), function(result, code, message)
                                                {
                                                  if(result == false)
                                                  {
                                                    res.status(code).send({ 'return' : false, 'message' : message });
                                                  }

                                                  else
                                                  {
                                                    res.status(201).send({ 'return' : true, 'message' : 'SUCCESS : account created !' });
                                                  }
                                                });
                                              }
                                            });
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

/****************************************************************************************************/

module.exports = router;
