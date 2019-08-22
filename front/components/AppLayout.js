import React, { useEffect } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'
import {Menu, Input, Button, Row, Col} from 'antd';
import {useSelector, useDispatch} from 'react-redux'

import {LOAD_USER_REQUEST} from '../reducers/user'
import UserProfile from './UserProfile'
import LoginForm from './LoginForm'

export const dummy = {
    nickname : '김서버',
    Post :[],
    Following : [],
    Followers : [],
}

const AppLayout = ({children})=>{
    const {isLoggedin, me} = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(!me){
            dispatch({
                type:LOAD_USER_REQUEST
            })
        }
    },[])
    return(
        <div>
            <Menu mode = "horizontal">
                <Menu.Item key = 'home'><Link href = '/'><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key = 'profile'><Link href = '/profile'><a>프로필</a></Link></Menu.Item>
                <Menu.Item key = 'mail'>
                    <Input.Search enterButton style = {{verticalAlign : 'middle'}}/>
                </Menu.Item>
                {isLoggedin === false ? <Link  href= '/signup'><a><Button>회원가입</Button></a></Link> : ''}
            </Menu>
            <Row gutter ={10}>
                <Col xs = {24} md = {6}>
                    {me ?<UserProfile me = {me}/>:
                    <LoginForm />
                    }
                </Col>
                <Col xs = {24} md = {12}>
                    {children}
                </Col>
                <Col xs = {24} md = {6}>칠드런이 index다! </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children : PropTypes.node
}
export default AppLayout;