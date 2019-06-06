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
    title : {
        type : String
    },
    writer : {
        type : String
    },
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



referenceSchema.plugin(autoIncrement,{
    model : 'references',
    field : 'id',
    startAt : 0
})

module.exports = mongoose.model('references', referenceSchema);