'use strict';

/****************************************************************************************************/

module.exports.insertIntoDatabase = function(table, obj, connector, callback)
{
  table == undefined || obj == undefined || connector == undefined ? callback(false, 406, 'ERROR : missing data in the query !') :
  
  connector.query(`INSERT INTO ${table} (${Object.keys(obj).join()}) VALUES ("${Object.values(obj).join("\",\"")}")`, function(err, result)
  {
    err ? callback(false, 500, 'ERROR : ' + err.message + ' !') : callback(true);
  });
}

/****************************************************************************************************/

module.exports.updateEntryInDatabase = function(table, updateObj, conditionObj, condition, connector, callback)
{
  if(table == undefined || updateObj == undefined)
  {
    callback(false, 406, 'ERROR : missing data in the query !');
  }

  else
  {
    var sql = "";
    var updatesStr = "";
    var array = [];
    var x = 0;

    var updatesLoop = function(key, value)
    {
        array.push(key + " = \"" + value + "\"");

        x++;

        Object.keys(updateObj)[x] == undefined ? updatesStr = array.join() : updatesLoop(Object.keys(updateObj)[x], updateObj[Object.keys(updateObj)[x]]);
    };

    updatesLoop(Object.keys(updateObj)[x], updateObj[Object.keys(updateObj)[x]]);

    if(conditionObj == undefined || conditionObj.length == 0)
    {
      sql = `UPDATE ${table} SET ${updatesStr}`;
    }

    else
    {
      var conditionsStr = "";
      array = [];
      x = 0;

      var conditionsLoop = function(key, value)
      {
        array.push(key + " = \"" + value + "\"");

        x++;

        Object.keys(conditionObj)[x] == undefined ? conditionsStr = array.join(" " + condition + " ") : conditionsLoop(Object.keys(conditionObj)[x], conditionObj[Object.keys(conditionObj)[x]]);
      };
  
      conditionsLoop(Object.keys(conditionObj)[x], conditionObj[Object.keys(conditionObj)[x]]);

      sql = `UPDATE ${table} SET ${updatesStr} WHERE ${conditionsStr}`;
    }
    
    connector.query(sql, function(err, result)
    {
      if(err)
      {
        callback(false, 500, 'ERROR : ' + err.message + ' !');
      }

      else if(result.changedRows == 0)
      {
        callback(false, 200, 'INFO : 0 rows updated !');
      }

      else
      {
        callback(true);
      }
    });
  }
}

/****************************************************************************************************/

module.exports.deleteFromDatabase = function(table, obj, condition, connector, callback)
{
  if((table == undefined || obj == undefined) || obj.length == 0 || (obj.length > 1 && condition == undefined))
  {
    callback(false, 406, 'ERROR : invalid parameters in the query !');
  }

  else
  {
    var x = 0;
    var str = "";
    var array = [];

    var loop = function(key, value)
    {
      array.push(`${key} = "${value}"`);

      x++;

      Object.keys(obj)[x] == undefined ? str = array.join(" " + condition + " ") : loop(Object.keys(obj)[x], obj[Object.keys(obj)[x]]);
    };

    loop(Object.keys(obj)[x], obj[Object.keys(obj)[x]]);

    connector.query(`DELETE FROM ${table} WHERE ${str}`, function(err, result)
    {
      if(err)
      {
        callback(false, 500, 'ERROR : ' + err.message + ' !');
      }

      else if(result.affectedRows == 0)
      {
        callback(false, 200, 'INFO : 0 rows deleted !');
      }

      else
      {
        callback(true);
      }
    });
  }
}

/****************************************************************************************************/

module.exports.getFromDatabase = function(table, arr, obj, condition, connector, callback)
{
  if((table == undefined || arr == undefined) || (obj == undefined && condition != undefined) || (obj != undefined && condition == undefined))
  {
    callback(false, 406, 'ERROR : invalid parameters in the query !');
  }

  else
  {
    var x = 0;
    var sql = "";
    var array = [];
    var fieldStr = "";
    var conditionStr = "";

    arr.length == 0 ? fieldStr = "*" : fieldStr = arr.join();

    if(obj == undefined || obj.length == 0)
    {
      sql = `SELECT ${fieldStr} FROM ${table}`;
    }

    else
    {
      var loop = function(key, value)
      {
        array.push(`${key} = "${value}"`);

        x++;

        Object.keys(obj)[x] == undefined ? conditionStr = array.join(" " + condition + " ") : loop(Object.keys(obj)[x], obj[Object.keys(obj)[x]]);
      };

      loop(Object.keys(obj)[x], obj[Object.keys(obj)[x]]);

      sql = `SELECT ${fieldStr} FROM ${table} WHERE ${conditionStr}`;
    }

    connector.query(sql, function(err, result)
    {
      if(err)
      {
        callback(false, 500, 'ERROR : ' + err.message + ' !');
      }

      else
      {
        callback(result);
      }
    });
  }
}

/****************************************************************************************************/