var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoClient = require('mongodb');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/signIn');
var logoutRouter = require('./routes/logOut');

var guestSignUpRouter = require('./routes/guestSignUp');
var hostSignUpRouter = require('./routes/hostSignUp');

var guestBoardRouter = require('./routes/guestBoard');
var hostBoardRouter = require('./routes/hostBoard');

var userinfoRouter = require('./routes/userInfo');
var userUpdateHostRouter = require('./routes/userUpdateHost');
var userUpdateGuestRouter = require('./routes/userUpdateGuest');

var notifyRegisterRouter = require('./routes/notifyRegister');
var notifyDeleteRouter = require('./routes/notifyDelete');

var mainRouter = require('./routes/main');
var chatRouter = require('./routes/chat');
var searchRouter = require('./routes/searchBoard');
var deleteRouter = require('./routes/deletePost');

var imageRouter = require('./routes/image');

var stateRouter = require('./routes/notifyState');

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

//정적파일사용 
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
// app.use('/users', usersRouter);

//login 기능 라우터 
app.use('/signIn',loginRouter);

//회원가입 기능 라우터
app.use('/hostSignUp', hostSignUpRouter);
app.use('/guestSignUp', guestSignUpRouter);

//logout 기능 라우터
app.use('/logOut',logoutRouter);

//게스트 게시판 기능 라우터
app.use('/guestBoard', guestBoardRouter);

//호스트 게시판 기능 라우터
app.use('/hostBoard', hostBoardRouter);

//개인정보가져오기 기능 라우터
app.use('/user',userinfoRouter);

//게스트 개인정보 수정 기능 라우터
app.use('/userUpdateGuest',userUpdateGuestRouter);
//호스트 개인정보 수정 기능 라우터
app.use('/userUpdateHost',userUpdateHostRouter);

//신청 알림 기능 라우터
app.use('/notifyRegister',notifyRegisterRouter);

//신청 삭제 기능 라우터
app.use('/notifyDelete', notifyDeleteRouter);

//main 화면 기능 라우터
app.use('/main', mainRouter);

//chat 기능 라우터 
app.use('/chat', chatRouter);

//특정유저가 작성한 모든 게시글 라우터
app.use('/searchBoard',searchRouter); 

//특정유저가 작성한 게시글 삭제 라우터
app.use('/deletePost',deleteRouter); 

// image upload test 라우터
app.use('/imageUpload', imageRouter);

//신청자 승인 거부 상태 알림 라우터
app.use('/notifyState',stateRouter);

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
