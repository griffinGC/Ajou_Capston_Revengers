const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const {Schema} = mongoose;
const guestSchema = new Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    guestId:{
        type : Number,
        unique : true     
    },
    //user의 id
    userName:{
        type : String,
        unique : true,
        required : true
    },
    password :{
        type : Number,
        required : true
    },
    name : {
        type : String
    },
    gender : {
        type : Boolean
    },
    age :{
        type : Number
    },
    ability : {
        type : String
    },
    phone : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    reference : {
        type : Number
    }
})
/*
guestSchema.plugin(autoIncrement,{
    model : 'guest',
    field : 'guestId',
    startAt : 0
})*/

module.exports = mongoose.model('guest', guestSchema);
