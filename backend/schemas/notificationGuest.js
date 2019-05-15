const {mongoose, autoIncrement} = require('./index');

const notificationSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    notificationGuestId :{
        type : Number,
        unique : true
    },
    userName:{
        type : String,
        unique : true,
        required : true
    },
    boardID :{
        type : String,        
    },
    guestUsername : {
        type : String
    },
    nowdate :{
        type : String,        
    },
    state : {
        type : String
    }
})

notificationSchema.plugin(autoIncrement,{
    model : 'notificationGuest',
    field : 'notificationGuestId',
    startAt : 0
})

module.exports = mongoose.model('notificationGuest', notificationSchema);