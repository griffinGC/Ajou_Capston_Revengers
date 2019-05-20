const {mongoose, autoIncrement} = require('./index');
const guestBoard = require('./guestBoard');

const notificationSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    notificationGuestId :{
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
//method생성 userName으로 받아와서 이거와 일치하는 board에 candidate 추가 
notificationSchema.statics.updateCandidate =function(name, boardId,  callback){
    this.findBoard(boardId, function(err, boardInfo){
        //boardInfo가 boardId로 찾아온 게시글 정보 
        let updateCandidate = "";
        if(boardInfo.candidate){
            console.log("넣기전 : " +boardInfo.candidate);
            boardInfo.candidate.push(name);
            updateCandidate = boardInfo.candidate;
            console.log("넣은후 : " + boardInfo.candidate);
            console.log("candidate : " + updateCandidate);
        }else{
            updateCandidate = updateCandidate.push(name);
            console.log(updateCandidate);
        }
        updateCandidateNumber = candidate.length;
        guestBoard.update({_id : boardInfo._id}, {$set : {candidate : candidate, candidateNumber : updateCandidateNumber}})
        console.log("update success");
        //callback을 넣는 곳이 뭔가 이상함
    }, callback);
};   

//boardId 받아와서 board 찾기
notificationSchema.statics.findBoard = function(boardId, callback){
    guestBoard.find({_id : boardId}, callback);
};


notificationSchema.plugin(autoIncrement,{
    model : 'notificationGuests',
    field : 'notificationGuestId',
    startAt : 0
})

module.exports = mongoose.model('notificationGuests', notificationSchema);