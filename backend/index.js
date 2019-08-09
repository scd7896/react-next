const express = require('express')
const morgan = require('morgan')
const cors = require('cors') //주소가 달라도 일치화시켜주는 미들웨어
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const dotenv = require('dotenv')
const passport = require('passport')

const passportConfig = require('./passport')
const db = require('./models')
const userAPIRouter = require('./routes/user')
const postAPIRouter = require('./routes/post')
const postsAPIRouter = require('./routes/posts')

dotenv.config()
const app = express()
db.sequelize.sync()
passportConfig()

//req.body를 사용 가능 할 수 있게 끔하는 구문

app.use(morgan('dev')) //요청 로그 확인
app.use(cors({ //쿠키로 교환되는 단위
    origin: true,
    credentials: true,
}))
app.use(express.json()) // json으로 데이터 받기 
app.use(express.urlencoded({extended:true})) //form데이터 처리
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(expressSession({
    resave : false, //매번 세션 강제저장
    saveUninitialized: false, // 빈값도 저장
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure: false, //https 쓸때 true로
    },
    name : 'rnbck',
    //store : RadisStore
}))
app.use(passport.initialize()) //서버에 세션과 프론트의 쿠키 보내는 행위를 해야하는 이유
app.use(passport.session())

app.use('/api/user', userAPIRouter)
app.use('/api/post', postAPIRouter)
app.use('/api/posts', postsAPIRouter)

app.listen(3065, ()=>{
    console.log(`server is running on http://localhost:${3065}`)
})