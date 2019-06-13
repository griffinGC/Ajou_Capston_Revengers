const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const connect = () =>{
    mongoose.connect('mongodb://localhost:27017/capDTest2',
    { useNewUrlParser : true }, (error) =>{
        if(error){
            console.log('디비 연결 에러', error);
        }else{
            console.log('디비 연결 성공');
        }
    });
};
//connect실행 

connect();
mongoose.connection.on('connected', ()=>{
    console.log('디비가 연결되었습니다.');
})
// autoIncrement.initialize(connect);
autoIncrement.initialize(mongoose.connection);
mongoose.connection.on('error', (error) =>{
    console.log('디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () =>{
    console.log('디비와 연결이 끊겼습니다.')
});

module.exports = {
    mongoose,
    autoIncrement : autoIncrement.plugin
}