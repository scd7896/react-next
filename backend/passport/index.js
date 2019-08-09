const passport = require('passport')
const db = require('../models')
const local = require('./local')

module.exports = ()=>{
    passport.serializeUser((user, done)=>{ 
        //서버에 [{id : 3, cookie : 'asdfgh'}]프론트에선 쿠키 서버에선 id사용
        return done(null, user.id)
    })

    passport.deserializeUser(async(id, done)=>{
        //id로 유저정보를 되찾아오는 것
        try{
            const user = await db.User.findOne({
                where : {id},
            })
            return done(null, user) //req.user에 저장
        }catch(e){
            console.log(e)
            return done(e)
        }
    })
    local()
}

// 프론트에서는 서버로 cookie만 보낸다 (asdfgh) 같은거
// 이를 받은 서버가 cookie-parser와 express-session 으로 쿠키를 검사한다.
// 검사해서 찾은 id값을 deserializeUser의 매개변수로 준다
// 그럼 해당 id값에 맞는 데이터를 디비로 쿼리를 날려서 조회를 하고 맞는 값을 req.변수명으로 리턴한다
// id는 sequelize에서는 자동으로 1씩상승하며 생성하지만 수동으로 만들경우 따로 속성명으로 저장해주자

// 요청 보낼때 마다 eserializeUser가 실행됨 (db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과물 캐싱한다