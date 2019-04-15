const mongoose = require('mongoose');

module.exports = () => {
    //connect 함수 정의
    const connect = () =>{
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug', true);
        }

        mongoose.connect('mongodb://localhost:27017/capDTest',
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
    mongoose.connection.on('error', (error) =>{
        console.log('디비 연결 에러', error);
    });
    mongoose.connection.on('disconnected', () =>{
        console.log('디비와 연결이 끊겼습니다.')
    });
    // require('./user');
    // require('./connect');
}