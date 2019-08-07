const passport = require('passport')
const {Strategy} = require('passport-local')
const bcrypt = require('bcrypt')
const db = require('../models')

module.exports = ()=>{
    passport.use(new Strategy({
        usernameField : 'userId',
        passwordField : 'password',
    }, async(userId, password, done)=>{
        try{
            const user = await db.User.findOne({
                where : {userId}
            })
            if(!user){
                return done(null, false, {reason :'존재하지 않는 사용자입니다.'})
                //1번째 인자는 서버쪽 에러, 2번째 인자는 성공 유무 , 3번째 인자는 그외의 만드는 에러경우
            }
            const result = await bcrypt.compare(password, user.password) 
            //해쉬 비교하는 함수 따라서 리턴값은 boolean값
            if (result){ // 일치할경우
                return done(null, user) // 그 유저의 정보를 2번째 인자로 돌려준다
            }
            return done(null, false, {reason:'비밀번호가 다릅니다.'})
        }catch(e){
            console.log(e)
            return done(e)
        }
    }))
}