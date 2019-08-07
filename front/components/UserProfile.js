import React, { useCallback } from 'react'
import { Card, Avatar} from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'antd'

import {logoutRequestAction} from '../reducers/user'


const UserProfile = ()=>{
    const {me} = useSelector(state=> state.user)
    const dispatch = useDispatch();
    
    const onLogout = useCallback(()=>{
        dispatch(logoutRequestAction)
    },[])
    return(
        <Card
            actions = {[
                <div key = 'twit'>짹쨱<br />{me.Post.length}</div>,
                <div key = 'twit'>팔로잉<br />{me.Following.length}</div>,
                <div key = 'twit'>팔로워<br />{me.Followers.length}</div>,,
                
            ]}>
            <Card.Meta avatar = {<Avatar>{me.nickname[0]}</Avatar>}
            title = {me.nickname}></Card.Meta> 
            <Button onClick = {onLogout} >로그아웃</Button>
        </Card> 
    )
}

export default UserProfile