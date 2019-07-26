import React from 'react'
import PropTypes from 'prop-types'

import {Button, Card, Avatar, Icon} from 'antd'

const PostCard = ({c})=>{
    return(
        <Card
            key = {+c.createdAt}
            cover = {c.img && <img alt ='example' src = {c.img}></img>}
            actions = {[
                <Icon type ='retweet' key = 'retweet' />,
                <Icon type ='heart' key = 'heart' />,
                <Icon type ='message' key = 'message' />,
                <Icon type ='elipsis' key = 'elipsis' />
            ]}
            extra ={<Button>팔로우</Button>}>
                <Card.Meta
                    avatar ={<Avatar>{c.User.nickname[0]}</Avatar>}
                    title = {c.User.nickname}
                    description = {c.content}
                ></Card.Meta>
        </Card>        
    )
}

PostCard.propTypes={
    c : PropTypes.shape({
        User : PropTypes.object,
        content : PropTypes.string,
        img : PropTypes.string,
        createdAt : PropTypes.object
    })
}
export default PostCard