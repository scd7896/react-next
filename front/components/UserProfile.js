import React from 'react'
import { Card, Avatar} from 'antd';

import {dummy} from './AppLayout'

const UserProfile = ()=>{
    return(
        <Card
            actions = {[
                <div key = 'twit'>짹쨱<br />{dummy.Post.length}</div>,
                <div key = 'twit'>팔로잉<br />{dummy.Following.length}</div>,
                <div key = 'twit'>팔로워<br />{dummy.Followers.length}</div>,
            ]}>
            <Card.Meta avatar = {<Avatar>{dummy.nickname[0]}</Avatar>}
            title = {dummy.nickname}></Card.Meta> 
        </Card> 
    )
}

export default UserProfile