// const mongoose = require('mongoose');
const {mongoose, autoIncrement} = require('./index');

const hostSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    hostId:{
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
    work : {
        type : String
    },
    address :{
        type : String
    },
    location : {
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

hostSchema.plugin(autoIncrement,{
    model : 'hosts',
    field : 'hostId',
    startAt : 0
})

module.exports = mongoose.model('hosts', hostSchema);
