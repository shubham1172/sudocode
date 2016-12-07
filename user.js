/**
This file manages user operations
It contains the following features:
  setPhoto
  getPhoto
  setUsername
  getUsername
  setBio
  getBio
  getUser
  deactivate
*/
var sessionManager = require("./session-manager");
var articleManager = require("./article-manager");
var sanitizer = require('sanitize-html');

function checkUsernameAvailable(obj, callback){
  //obj has username and pool
  obj.pool.any("SELECT id from sudocode.users WHERE username = $1", [obj.username])
  .then(function(results){
    if(results.length==0)
      callback(true);
    else
      callback(results[0].id);
  })
  .catch(function(error){
    console.log(error.toString());
    callback("error");
  });
}

exports.setUsername = function(req, res, pool){
    sessionManager.checkLoginf(req, pool, function(isLogged){
        if(isLogged=="false")
          res.status(403).send("Login to set username");
        else if(isLogged=="error")
          res.status(500).send("Error");
        else if(req.body.username.trim()=="")
          res.status(500).send("Bad request");
        else{
          //now check if the username is taken by anyone else or not!
          var username = sanitizer(req.body.username, {allowedTags: []});
          var id = req.session.auth.userId;
          checkUsernameAvailable({username: username, pool: pool},function(available){
            if(available==true){
              //UPDATE username
              if(username.trim()=="")
                res.status(500).send("Empty username");
              else
              pool.none("UPDATE sudocode.users SET username = $1 WHERE id = $2", [username, id])
                .then(function(){
                  res.status(200).send("Updated successfully");
                })
                .catch(function(error){
                  console.log(error.toString());
                  res.status(500).send("Error");
                });
            }
            else if(available=="error")
              res.status(500).send("Error");
            else if(available==id)
              res.status(403).send("You already have this username");
            else
              res.status(403).send("Username already taken by someone!");
          });
        }
    });
}

exports.getUsername = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get username");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      pool.one("SELECT username FROM sudocode.users WHERE id = $1", [req.session.auth.userId])
      .then(function(results){
        res.status(200).send(results.username);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}

exports.setBio = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      req.status(403).send("Login to set Bio");
    else if(isLogged=="error")
      req.status(500).send("Error");
    else{
      var bio = sanitize(req.body.bio);
      var id = req.session.auth.userId;
      if(bio.trim()=="")
        res.status(500).send("Empty bio");
      else
      pool.none("UPDATE sudocode.users SET bio = $1 WHERE id = $2", [bio, id])
        .then(function(){
          if(bio.trim()=="")
            res.status(200).send("Bio removed successfully");
          else
            res.status(200).send("Bio updated successfully");
        })
        .catch(function(error){
          console.log(error.toString());
          res.status(500).send("Error");
        });
    }
  });
}

exports.getBio = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get bio");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      pool.one("SELECT bio FROM sudocode.users WHERE id = $1", [req.session.auth.userId])
      .then(function(results){
        res.status(200).send(results.bio);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}

exports.getUser = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get user details");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      pool.one("SELECT id,username,bio,photo FROM sudocode.users WHERE id = $1 AND state = true", [req.session.auth.userId])
      .then(function(results){
        articleManager.getArticleByUser(req.session.auth.userId, pool, function(articles){
          results.articles = articles;
          res.status(200).send(results);
        });
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}
