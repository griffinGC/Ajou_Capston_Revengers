const {mongoose, autoIncrement} = require('./index');

const chatRoomSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    chatRoomId:{
        type : String,
        unique : true     
    },
    //user의 id
    hostUserName:{
        type : String,
    },
    guestUserName:{
        type : String
    }
})


module.exports = mongoose.model('chatRooms', chatRoomSchema);
