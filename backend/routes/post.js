const express = require('express')
const router = express.Router()
const db = require('../models')
router.post('/', async(req,res)=>{ //   POST /api/post
    try{
        const hashtags = req.body.content.match(/#[^\s]+/g)
        const newPost = await db.Post.create({
           content : req.body.content, // ex) '#구독 #좋아요'
           UserId : req.user.id
        })
        if(hashtags){
            const result = await Promise.all(hashtags.map((tag)=> db.Hashtag.findOrCreate({
                where : {name : tag.slice(1).toLowerCase()}
            })))
            console.log(result)
            await newPost.addHashtags(result.map(r=>r[0]))
        }
        // const User = await newPost.getUser()
        // newPost.User = User ;
        // res.json(newPost)
        const fullPost = await db.Post.findOne({
            where :{
                id : newPost.id
            },
            include : [{
                model : db.User
            }]
        })
        res.json(fullPost)
    }catch(e){
        console.error(e)
        next(e)
    }
})
router.post('/images', (req,res)=>{

})

module.exports = router;