const {mongoose, autoIncrement} = require('./index');
const hostBoard = require('./hostBoard');

const notificationSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    notificationHostId :{
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
        console.log("1");
        let receiveBoardInfo = boardInfo[0].candidate;
        console.log("board 정보에 있는 candidate " + receiveBoardInfo);
        if(receiveBoardInfo){
            console.log("넣기전 : " +receiveBoardInfo);
            receiveBoardInfo.push(name);
            updateCandidate = receiveBoardInfo;
            console.log("넣은후 : " + receiveBoardInfo);
            console.log("candidate : " + updateCandidate);
        }else{
            updateCandidate = [name];
            console.log("없을 경우 update : " +updateCandidate);
        }
        updateCandidateNumber = updateCandidate.length;
        //callback을 넣어서 update한 뒤에 저장되도록 만듬 
        hostBoard.update({hostBoardId : boardId}, {$set : {candidate : updateCandidate, candidateNumber : updateCandidateNumber}}, callback)
        console.log("host update success");
    });
};   

//boardId 받아와서 board 찾기
notificationSchema.statics.findBoard = function(boardId, callback){
    console.log(boardId);
    //_id는 object라서 받기 힘듬 
    hostBoard.find({hostBoardId : boardId}, callback);
};


notificationSchema.plugin(autoIncrement,{
    model : 'notificationHosts',
    field : 'notificationHostId',
    startAt : 0
})

module.exports = mongoose.model('notificationHosts', notificationSchema);

