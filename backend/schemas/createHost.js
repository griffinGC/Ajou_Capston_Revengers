const {mongoose, autoIncrement} = require('./index');

const hostSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    id:{
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
        type : String,
        required : true
    },
    name : {
        type : String
    },
    profileImg :{
        type : String,  
    },
    gender : {
        type : String
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
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    reference : {
        type : Number
    },
    role :{
        type : String
    },
    report : {
        type : Boolean
    },
    isReport : {
        type : Array
    },
    visited:{
        type : Array
    },
    latitude : {
        type : Number
    },
    longtitude : {
        type : Number
    },
})

hostSchema.statics.deleteFile = function(name, callback){
    this.find({userName : name}, callback)
}

hostSchema.statics.findAbility = function(name, callback){
    this.find({userName : name}, callback);
}

hostSchema.plugin(autoIncrement,{
    model : 'hosts',
    field : 'hostId',
    startAt : 0
})

module.exports = mongoose.model('hosts', hostSchema);