var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoClient = require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/signIn');
var logoutRouter = require('./routes/logOut');
var signUpRouter = require('./routes/signUp');
var boardRouter = require('./routes/board');


// var connect = require('./schemas/index');
require('./schemas/index');

var app = express();

/*var databaes;

function connectDB(){
  var databaesUrl = 'mongodb://localhost:27017.local';

  MongoClient.connect(databaesUrl, function(err, db){
    if(err) throw err;
    console.log('success  '+databaesUrl);

    databaes=db;
  });
}*/



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : 'secret code',
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
  next()
})

app.use('/', indexRouter);
//여기서 '/user'라고 적어주면 밑에서는 '/'만 적어도 됨 
app.use('/users', usersRouter);

//login 기능 라우터 
app.use('/signIn',loginRouter);

//회원가입 기능 라우터
app.use('/signUp', signUpRouter);

//logout 기능 라우터
app.use('/logOut',logoutRouter);

//게시판 기능 라우터
app.use('/board', boardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
