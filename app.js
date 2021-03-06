var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');

var app = express();


// CHANGED PORT FOR LOCAL TESTING. REMEMBER TO CHANGE IT TO RUN THE APPLICATION IN BLUEMIX
var port = process.env.PORT || 1337;
//var port = process.env.PORT || 3001;
app.set('port', port);  

cloudinary.config({ 
  cloud_name: 'dz8rfvtt1', 
  api_key: '961236131622366', 
  api_secret: 'MlYr1mnNNbEhSMtC1I08N0Z_VFk' 
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://picclass-backend.eu-gb.mybluemix.net');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

 app.get('/', function(req, res, next) {
     res.redirect('/html/login.html');
 });

 app.get('/user/:userid/', function(req, res, next) {

    var userid = req.params.userid;
    res.redirect('/html/index.html?userid=' + userid);

});

app.get('/user/*', function(req, res, next) {
    res.redirect('/html/index.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

//  // render the error page
//  res.status(err.status || 500);
//  res.render('error');
});

app.listen(app.get('port'));

module.exports = app;
