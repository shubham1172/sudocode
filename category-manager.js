/**
This file manages category actions
It contains the following features:
  getCategory
*/
var sessionManager = require("./session-manager");
var sanitizer = require('sanitize-html');

exports.getCategory = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
      if(isLogged=='false')
        res.status(403).send("Login to get categories");
      else if(isLogged=="error")
        res.status(500).send("Error");
      else{
        pool.any("SELECT name FROM sudocode.categories ORDER BY name ASC")
          .then(function(results){
            var response = {categories: []};
            for(var x=0;x<results.length;x++){
              response.categories.push({name: results[x].name});
            }
            res.status(200).send(JSON.stringify(response));
          })
          .catch(function(error){
            console.log(error.toString());
            res.status(500).send("error");
          });
      }
  });
}

exports.getAllowedTags = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
      if(isLogged=='false')
        res.status(403).send("Login to get tags");
      else if(isLogged=="error")
        res.status(500).send("Error");
      else{
        var obj = {tags: sanitizer.defaults.allowedTags, attrib: sanitizer.defaults.allowedAttributes};
        res.status(200).send(obj);
      }
  });
}
