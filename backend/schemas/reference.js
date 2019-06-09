const {mongoose, autoIncrement} = require('./index');


const referenceSchema = new mongoose.Schema({
    //db에 저장하는 id 자동적으로 1씩 증가 
    id :{
        type : Number,
        unique : true
    },
    boardId : {
        type : Number
    },
    boardType :{
        type : String
    },
    boardTitle :{
        type : String
    },
    title : {
        type : String
    },
    // reference 작성자
    writer : {
        type : String
    },
    writerImg : {
        type : String
    },
    // reference가 작성될 profile
    userName:{
        type : String
    },
    writeDay : {
        type : Date
    },
    content :{
        type : String        
    },
    star : {
        type : Number
    }
})
//receiveName은 후기가 달릴 사람의 id
// receiveBoard는 후기가 달릴 boardId
// writeName은 후기를 남긴 사람
referenceSchema.statics.saveWithNotification =function(receiveName, receiveBoardId, writeName, type, callback){
    // let newReference = new referenceSchema();
    let newReference = new this();
    newReference.userName = receiveName;
    newReference.boardId = receiveBoardId;
    newReference.writer = writeName;
    newReference.boardType = type;
    newReference.save(callback);
};   

//candidate 삭제 
referenceSchema.statics.deleteWithNotification = function(receiveName, receiveBoardId, writeName,type, callback){
    this.deleteOne({userName : receiveName, boardId : receiveBoardId, writer : writeName, boardType : type}, callback);
}



referenceSchema.plugin(autoIncrement,{
    model : 'references',
    field : 'id',
    startAt : 0
})

module.exports = mongoose.model('references', referenceSchema);