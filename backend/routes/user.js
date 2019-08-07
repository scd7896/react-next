const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../models')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('hello world')
})

router.post('/', async (req,res,next)=>{ //회원가입
    console.log(req.body)
    try{

        /*
            mysql.query(`SELECT *  
            FROM users 
            WHERE userId = ${req.body.userId}`)
            있을경우 1개를 반환한다
        */
        const exUser = await db.User.findOne({
            where :{
                userId : req.body.userId,
            }
        })
        /* if(exUser.length > 0) */
        if(exUser){
            return res.status(409).send('이미 사용중인 아이디입니다')
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        /* mysql.query(`INSERT INTO users(nickname, userId, password) 
                            VALUES (${req.body.nickname}, ${req.body.userId}, ${hashedPassword})`) */
        const newUser = await db.User.create({
            nickname : req.body.nickname,
            userId : req.body.userId,
            password : hashedPassword,
        })
        console.log(newUser)
        return res.status(200).json(newUser)

    }catch(e){
        console.error(e)
        //에러 처리를 여기서 진행
        return next(e)
    }
})

router.get('/:id',(req,res)=>{

})
router.post('/logout', (req, res)=>{

})
router.post('/login',(req, res, next)=>{
    passport.authenticate('local',(err,user, info)=>{
        // err ->서버에러, user-> 유저정보, info -> 로직상에러 passprot밑에 local에서 확인 가능
        if(err){
            console.error(err)
            return next(err)
        }
        if(info){
            return res.status(401).send(info.reason)
        }
        return req.login(user, (loginErr)=>{
            if(loginErr){
                return next(loginErr)
            }
            const filteredUser = Object.assign({},user);
            delete filteredUser.password
            return res.json(user)
        })
    }) //첫 인자에 kakao나 facebook같은거 넣을수 있다.
})
router.get('/:id/follow', (req, res)=>{

})
router.post('/:id/follow', (req, res)=>{

})
router.delete('/:id/follow', (req, res)=>{

})

router.delete('/:id/follower', (req, res)=>{

})

router.get('/:id/post', (req,res)=>{

})
module.exports = router