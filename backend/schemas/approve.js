const {mongoose, autoIncrement} = require('./index');

const approveSchema = new mongoose.Schema({
    //확인하기 위한 폰번호
    phoneNumber:{
        type : String
    },
    //user의 id
    randomCode:{
        type : Number,
        required : true
    },
    role : {
        type : String
    }
})


module.exports = mongoose.model('approve', approveSchema);
