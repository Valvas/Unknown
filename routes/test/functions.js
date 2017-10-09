'use strict';

const express = require('express');
const functions = require('../../api/functions');

let router = express.Router();

/****************************************************************************************************/

//Used to get the remaining time from now to the date provided in the query.

router.post('/remaining-time', function(req, res)
{
  if(req.body['date'] == undefined)
  {
    res.status(406).send({ 'result' : false, 'message' : 'ERROR : no date provided !' });
  }

  else
  {
    functions.getRemainingTimeFromDate(req.body['date'], function(result, code, message)
    {
      if(result == false)
      {
        res.status(code).send({ 'result' : false, 'message' : message });
      }

      else
      {
        res.status(200).send({ 'result' : true, 'years' : result['years'], 'months' : result['months'], 'days' : result['days'], 'hours' : result['hours'], 'minutes' : result['minutes'], 'seconds' : result['seconds'] });
      }
    });
  }
});

/****************************************************************************************************/

module.exports = router;