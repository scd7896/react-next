import React, { useCallback } from 'react'
import { Card, Avatar} from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'antd'

import {logoutRequestAction} from '../reducers/user'


const UserProfile = ({me})=>{
    console.log(me)
    const dispatch = useDispatch();
    const onLogout = useCallback(()=>{
        dispatch(logoutRequestAction)
    },[])
    return(
        <Card
            actions = {[
                
            ]}>
            <Card.Meta avatar = {<Avatar>{me.nickname[0]}</Avatar>}
            title = {me.nickname}></Card.Meta> 
            <Button onClick = {onLogout} >로그아웃</Button>
        </Card> 
    )
}

export default UserProfile