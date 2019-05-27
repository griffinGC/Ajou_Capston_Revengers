const {mongoose, autoIncrement} = require('./index');
const hostModel = require('./createHost');

const hostBoardSchema = new mongoose.Schema({
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
        type : Number,
        required : true
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
    candidate :{
        type : Array
    },
    candidateNumber : {
        type : Number
    },
    latitude : {
        type : Number
    },
    longtitude : {
        type : Number
    }
})

hostBoardSchema.statics.findByUserName = function(name, callBack){
    hostModel.find({userName : name}, callBack)
}

hostBoardSchema.plugin(autoIncrement,{
    model : 'hostBoard',
    field : 'boardId',
    startAt : 1
})

module.exports = mongoose.model('hostBoard', hostBoardSchema);
