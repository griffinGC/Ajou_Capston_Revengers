var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '로그인 페이지 입니다.' });
});

module.exports = router;
