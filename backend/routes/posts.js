const express = require('express')
const router = express.Router()
const db = require('../models')


router.get('/', async (req, res)=>{ // GET /api/posts
    try{
        const posts = await db.Post.findAll({
            include :[{
                model : db.User,
                attributes : ['id', 'nickname']
            }],
            order : [['createdAt', 'DESC']]
        })
        return res.json(posts)
    }catch(e){
        console.error(e)
        next(e)
    }
})

module.exports = router;