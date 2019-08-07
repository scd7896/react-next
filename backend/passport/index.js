const passport = require('passport')
const db = require('../models')
const local = require('./local')

module.exports = ()=>{
    passport.serializeUser((user, done)=>{ 
        //서버에 [{id : 3, cookie : 'asdfgh'}]프론ㅌ에선 쿠키 서버에선 id사용
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