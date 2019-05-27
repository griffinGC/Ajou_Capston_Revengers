const {mongoose, autoIncrement} = require('./index');

const adminSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    adminId:{
        type : String,
        unique : true     
    },
    //user의 id
    userName:{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    }
})


module.exports = mongoose.model('admins', adminSchema);
