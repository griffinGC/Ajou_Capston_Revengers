const {mongoose, autoIncrement} = require('./index');

const guestSchema = new mongoose.Schema({
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
    ability : {
        type : Array
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
    role : {
        type : String
    },
    report : {
        type : Boolean
    },
    isReport :{
        type : Array
    },
    visited:{
        type : Array
    }
})

guestSchema.statics.deleteFile = function(name, callback){
    this.find({userName : name}, callback);
}

guestSchema.statics.findAbility = function(name, callback){
    this.find({userName : name}, callback);
}

guestSchema.plugin(autoIncrement,{
    model : 'guests',
    field : 'guestId',
    startAt : 0
})

module.exports = mongoose.model('guests', guestSchema);
