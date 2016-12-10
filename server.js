/**
This file is the main server file
  It routes the urls to their respective managers.
*/
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pgp = require('pg-promise')();
var bodyParser = require('body-parser');
var session = require('express-session');
var sanitizer = require('sanitize-html');
var user = require('./user.js');
var sessionManager = require('./session-manager.js');
var articleManager = require('./article-manager.js');
var commentManager = require('./comment-manager.js');
var categoryManager = require('./category-manager.js');
var config = {
    user: 'postgres',
    database: 'postgres',
    host: '127.0.0.1',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var pool = pgp(config);

var app = express();

app.use(morgan('combined'));
  app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000*60*60}
}));

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

 //front end files
app.get('/ui/:fileName', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

//use case: www.host:port/ui/?filePath=fontawesome/test/sample.txt
app.get('/ui', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.query.filePath));
});

//jquery
app.get('/jquery/jquery-2.2.0.min.js', function(req,res){
  res.sendFile(path.join(__dirname,'jquery','jquery-2.2.0.min.js'));
});
app.get('/jquery-ui/jquery-ui.min.js', function(req, res){
  res.sendFile(path.join(__dirname,'jquery-ui','jquery-ui.min.js'));
});

//hashing
app.get('/hash/:input', function(req, res) {
  sessionManager.getHash(req, res);
});

//session management
app.get('/check-login', function(req, res){
   sessionManager.checkLogin(req,res,pool);
});

app.post('/login', function(req, res){
   sessionManager.login(req,res,pool);
});

app.get('/logout', function(req, res){
  sessionManager.logout(req,res,pool);
});

/** /checkId/?id=xxx */
app.get('/checkId', function(req, res){
  sessionManager.checkId(req, res, pool);
});

//article management
app.post('/create-article', function(req, res){
  articleManager.createArticle(req,res,pool);
});

/** /delete-article/?id=aid*/
app.get('/delete-article', function(req, res){
  articleManager.deleteArticle(req, res, pool);
});

/** /get-articles/?category=Python or /get-articles/?userId=123 */
app.get('/get-articles', function(req, res){
  articleManager.getArticle(req,res,pool);
});

/** /edit-article/*/
app.post('/edit-article', function(req, res){
  articleManager.editArticle(req,res,pool);
});

//comment management
app.post('/create-comment', function(req, res){
  commentManager.createComment(req,res,pool);
});

/** /delete-comment/?id=cid*/
app.get('/delete-comment', function(req, res){
  commentManager.deleteComment(req, res, pool);
});

/** /get-comments/?aid=123*/
app.get('/get-comments', function(req, res){
  commentManager.getComment(req,res,pool);
});

app.post('/edit-comment', function(req, res){
  commentManager.editComment(req,res,pool);
});

//category management
app.get('/get-categories', function(req, res){
  categoryManager.getCategory(req,res,pool);
});

app.get('/get-allowed-tags', function(req, res){
  categoryManager.getAllowedTags(req,res,pool);
});

//user actions
app.post('/set-username', function(req, res){
  user.setUsername(req,res,pool);
});

app.post('/set-bio', function(req, res){
  user.setBio(req,res,pool);
});

app.get('/get-username', function(req, res){
  user.getUsername(req,res,pool);
});

app.get('/get-bio', function(req, res){
  user.getBio(req,res,pool);
});

app.get('/get-user', function(req, res){
  user.getUser(req,res,pool);
});

app.post('/change-password', function(req, res){
  user.changePassword(req,res,pool);
});

var port = 8082;
app.listen(port, function(){
  console.log('SUDOCODE up and running on 8082!');
});
