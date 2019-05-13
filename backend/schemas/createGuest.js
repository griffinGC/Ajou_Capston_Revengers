const {mongoose, autoIncrement} = require('./index');

const guestSchema = new mongoose.Schema({
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
        type : Boolean
    },
    age :{
        type : Number
    },
    ability : {
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
    role : {
        type : String
    }
})

guestSchema.plugin(autoIncrement,{
    model : 'guests',
    field : 'guestId',
    startAt : 0
})

module.exports = mongoose.model('guests', guestSchema);
