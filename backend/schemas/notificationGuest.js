const {mongoose, autoIncrement} = require('./index');
const guestModel = require('./createGuest');

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
//method생성 userName으로 받아와서 이거와 일치하는 user에 candidate 추가 
notificationSchema.statics.updateCandidate =function(data, callback){
    let calCandidate = data.candidate;
    
    console.log(calCandidate);
    guestModel.update({userName : name}, {$set : {candidate : calCandidate},callback})
};

notificationSchema.statics.findByUserName = function(name, callback){
    guestModel.find({userName :name}, callback);
}

notificationSchema.plugin(autoIncrement,{
    model : 'notificationGuest',
    field : 'notificationGuestId',
    startAt : 0
})

module.exports = mongoose.model('notificationGuest', notificationSchema);