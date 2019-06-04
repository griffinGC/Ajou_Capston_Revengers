const {mongoose, autoIncrement} = require('./index');
const guestModel = require('./createGuest');

const guestBoardSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    boardId:{
        type : Number,
        unique : true     
    },
    title:{
        type : String,
        required : true
    },
    content :{
        type : String,
        required : true
    },
    Info : {
        type : Object,
    },
    boardImg : {
        type : String
    },
    startDate : {
        type : Date,
    },
    endDate:{
        type : Date,
    },
    difficulty :{
        type : Number
    },
    workDay : {
        type : Number
    },
    category : {
        type : String
    },
    reward : {
        type : String
    },
    preferLocation : {
        type : Array
    },
    candidate :{
        type : Array
    },
    candidateNumber : {
        type : Number
    },
    report : {
        type : Boolean
    },
    isReport :{
        type : Array
    }
})

guestBoardSchema.statics.findByUserName = function(name, callBack){
    guestModel.find({userName : name}, callBack)
}

guestBoardSchema.plugin(autoIncrement,{
    model : 'guestBoard',
    field : 'boardId',
    startAt : 1
})

module.exports = mongoose.model('guestBoard', guestBoardSchema);
