const {mongoose, autoIncrement} = require('./index');

const notificationSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
   
    userName:{
        type : String,
        unique : true,
        required : true
    },
    boardID :{
        type : String,        
    },
    content : {
        type : String
    },
    nowdate :{
        type : String,        
    },
    state : {
        type : Number
    }
})

notificationSchema.plugin(autoIncrement,{
    model : 'notificationHost',
    field : 'notificationNumber',
    startAt : 0
})

module.exports = mongoose.model('notificationHost', notificationSchema);