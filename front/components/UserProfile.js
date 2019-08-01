import React, { useCallback } from 'react'
import { Card, Avatar} from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'antd'

import {logoutAction} from '../reducers/user'


const UserProfile = ()=>{
    const nickname = useSelector(state=>state.user.user.nickname)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    
    const onLogout = useCallback(()=>{
        dispatch(logoutAction)
    },[])
    return(
        <Card
            actions = {[
                <div key = 'twit'>짹쨱<br />{user.Post.length}</div>,
                <div key = 'twit'>팔로잉<br />{user.Following.length}</div>,
                <div key = 'twit'>팔로워<br />{user.Followers.length}</div>,,
                
            ]}>
            <Card.Meta avatar = {<Avatar>{nickname[0]}</Avatar>}
            title = {nickname}></Card.Meta> 
            <Button onClick = {onLogout} >로그아웃</Button>
        </Card> 
    )
}

export default UserProfile