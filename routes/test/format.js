'use strict';

const express = require('express');
const format = require('../../api/format/format');

let router = express.Router();

/****************************************************************************************************/

//Used to realize tests on the email format checking.

router.post('/email', function(req, res)
{
    if(req.body.email == undefined)
    {
      res.status(406).send({ 'result' : false, 'message' : 'ERROR : no email provided !' });
    }

    else
    {
      format.checkEmailFormat(req.body.email, function(result, code, message)
      {
        if(result == false)
        {
          res.status(code).send({ 'result' : false, 'message' : message });
        }

        else
        {
          res.status(200).send({ 'result' : true, 'message': 'SUCCESS : test OK !' });
        }
      });
    }
});

/****************************************************************************************************/

//Used to realize tests on the password format checking.

router.post('/password', function(req, res)
{
    if(req.body.password == undefined)
    {
      res.status(406).send({ 'result' : false, 'message' : 'ERROR : no password provided !' });
    }

    else
    {
      format.checkPasswordFormat(req.body.password, function(result, code, message)
      {
        if(result == false)
        {
          res.status(code).send({ 'result' : false, 'message' : message });
        }

        else
        {
          res.status(200).send({ 'result' : true, 'message': 'SUCCESS : test OK !' });
        }
      });
    }
});

/****************************************************************************************************/

//Used to realize tests on the username format checking.

router.post('/username', function(req, res)
{
    if(req.body.username == undefined)
    {
      res.status(406).send({ 'result' : false, 'message' : 'ERROR : no username provided !' });
    }

    else
    {
      format.checkUsernameFormat(req.body.username, function(result, code, message)
      {
        if(result == false)
        {
          res.status(code).send({ 'result' : false, 'message' : message });
        }

        else
        {
          res.status(200).send({ 'result' : true, 'message': 'SUCCESS : test OK !' });
        }
      });
    }
});

/****************************************************************************************************/

//Used to realize tests on the birthdate format checking.

router.post('/birthdate', function(req, res)
{
    if(req.body.birthdate == undefined)
    {
      res.status(406).send({ 'result' : false, 'message' : 'ERROR : no birthdate provided !' });
    }

    else
    {
      format.checkBirthdateFormat(req.body.birthdate, function(result, code, message)
      {
        if(result == false)
        {
          res.status(code).send({ 'result' : false, 'message' : message });
        }

        else
        {
          res.status(200).send({ 'result' : true, 'message': 'SUCCESS : test OK !' });
        }
      });
    }
});

/****************************************************************************************************/

//Used to realize tests on the gender format checking.

router.post('/gender', function(req, res)
{
    if(req.body.gender == undefined)
    {
      res.status(406).send({ 'result' : false, 'message' : 'ERROR : no gender identifier provided !' });
    }

    else
    {
      format.checkGenderFormat(req.body.gender, function(result, code, message)
      {
        if(result == false)
        {
          res.status(code).send({ 'result' : false, 'message' : message });
        }

        else
        {
          res.status(200).send({ 'result' : true, 'message': 'SUCCESS : test OK !' });
        }
      });
    }
});

/****************************************************************************************************/

//Used to realize tests on the country format checking.

router.post('/country', function(req, res)
{
    if(req.body.country == undefined)
    {
      res.status(406).send({ 'result' : false, 'message' : 'ERROR : no country provided !' });
    }

    else
    {
      format.checkCountryFormat(req.body.country, function(result, code, message)
      {
        if(result == false)
        {
          res.status(code).send({ 'result' : false, 'message' : message });
        }

        else
        {
          res.status(200).send({ 'result' : true, 'message': 'SUCCESS : test OK !' });
        }
      });
    }
});

/****************************************************************************************************/

//Used to realize tests on the county format checking.

router.post('/county', function(req, res)
{
    if(req.body.county == undefined)
    {
      res.status(406).send({ 'result' : false, 'message' : 'ERROR : no county identifier provided !' });
    }

    else if(req.body.country == undefined)
    {
      res.status(406).send({ 'result' : false, 'message' : 'ERROR : no country provided !' });
    }

    else
    {
      format.checkCountyFormat(req.body.country, req.body.county, function(result, code, message)
      {
        if(result == false)
        {
          res.status(code).send({ 'result' : false, 'message' : message });
        }

        else
        {
          res.status(200).send({ 'result' : true, 'message': 'SUCCESS : test OK !' });
        }
      });
    }
});

/****************************************************************************************************/

module.exports = router;
