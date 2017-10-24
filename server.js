// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var shortURL = require('./models/URLModel');
var api = require('./api/shortner');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/new/*', function(req, res) {
  const originalUrl = req.originalUrl.substr(5); //skis the /new/ part
  
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  const urlRegExp = new RegExp(regex);
  
  if(urlRegExp.test(originalUrl) === false) {
    res.send({
      "error" : "invalid URL type"
    });
    return;
  }
  
  const key = api.getShortCode();
  var _newurl = new shortURL({
    original_url : originalUrl,
    short_url : key
  });
  
  shortURL.getShortURL(_newurl, function(err, url) {
    if(err) throw err;
    console.log(url);
  });
  
  res.send({short_url:'https://'+req.headers.host+'/'+key,
            original_url : originalUrl});
  
});

app.get('/:shortcode', function(req, res) {
  const key = req.params.shortcode;
  shortURL.getLongURL(key, function(err, url) {
    if(err) throw err;
    console.log(url);
    if(!url) 
      res.send({"error" : "404: No URL mapping for this shortURL"});
    else
      res.redirect(url.original_url);
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
