const {mongoose, autoIncrement} = require('./index');

const chatSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    chatId:{
        type : String,
        unique : true     
    },
    //user의 id
    userName:{
        type : String,
        required : true
    },
    boardId:{
        type : String
    }
})


module.exports = mongoose.model('chats', chatSchema);
