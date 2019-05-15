const {mongoose, autoIncrement} = require('./index');
const guestModel = require('./createGuest');

const guestBoardSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    guestBoardId:{
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
    guestInfo : {
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
    preferLocation : {
        type : String
    },
    candidate :{
        type : Array
    },
    candidateNumber : {
        type : Number
    }
})

guestBoardSchema.statics.findByUserName = function(name, callBack){
    guestModel.find({userName : name}, callBack)
}

guestBoardSchema.plugin(autoIncrement,{
    model : 'guestBoard',
    field : 'guestBoardId',
    startAt : 1
})

module.exports = mongoose.model('guestBoard', guestBoardSchema);
