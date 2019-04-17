var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest')

router.post('/',function(req, res, next){
    res.send("yes~")
})

module.exports = router;