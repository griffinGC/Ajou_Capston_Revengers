const {mongoose, autoIncrement} = require('./index');

const notificationSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    notificationHostId :{
        type : Number,
        unique : true
    },
    userName:{
        type : String,
        required : true
    },
    boardID :{
        type : String,        
    },
    hostUsername : {
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
    model : 'notificationHosts',
    field : 'notificationHostId',
    startAt : 0
})

module.exports = mongoose.model('notificationHosts', notificationSchema);

