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
    boardInfo :{
        type : Object,        
    },
    writer : {
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
        let receiveBoardInfo = boardInfo[0].candidate;
        // console.log("board 정보에 있는 candidate " + receiveBoardInfo);
        if(receiveBoardInfo){
            // console.log("넣기전 : " +receiveBoardInfo);
            receiveBoardInfo.push(name);
            updateCandidate = receiveBoardInfo;
            // console.log("candidate : " + updateCandidate);
        }else{
            updateCandidate = [name];
            // console.log("없을 경우 update : " +updateCandidate);
        }
        updateCandidateNumber = updateCandidate.length;
        //callback을 넣어서 update한 뒤에 저장되도록 만듬 
        guestBoard.update({guestBoardId : boardId}, {$set : {candidate : updateCandidate, candidateNumber : updateCandidateNumber}}, callback)
        // console.log("guest update success");
    });
};   

notificationSchema.statics.deleteCandidate = function(name, boardId, callback){
    this.findBoard(boardId, function(err, boardInfo){
        let deleteCandidate = name;
        let receiveBoardInfo = boardInfo[0].candidate;
        if(receiveBoardInfo){
            // console.log("넣기전 : " +receiveBoardInfo);
            receiveBoardInfo.push(name);
            updateCandidate = receiveBoardInfo;
            // console.log("candidate : " + updateCandidate);
        }else{
            updateCandidate = [name];
            // console.log("없을 경우 update : " +updateCandidate);
        }
        updateCandidateNumber = updateCandidate.length;
        //callback을 넣어서 update한 뒤에 저장되도록 만듬 
        guestBoard.update({guestBoardId : boardId}, {$set : {candidate : updateCandidate, candidateNumber : updateCandidateNumber}}, callback)
        // console.log("guest update success");
    })
}

//boardId 받아와서 board 찾기
notificationSchema.statics.findBoard = function(boardId, callback){
    console.log(boardId);
    //_id는 object라서 받기 힘듬 
    // guestBoard.find({_id : boardId}, callback);
    guestBoard.find({guestBoardId : boardId}, callback);
};


notificationSchema.plugin(autoIncrement,{
    model : 'notificationGuests',
    field : 'notificationGuestId',
    startAt : 0
})

module.exports = mongoose.model('notificationGuests', notificationSchema);