import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'
import {Menu, Input, Button, Row, Col} from 'antd';

import UserProfile from './UserProfile'
import LoginForm from './LoginForm'

export const dummy = {
    nickname : '김서버',
    Post :[],
    Following : [],
    Followers : [],
    isLoggedin: true
}

const AppLayout = ({children})=>{
    return(
        <div>
            <Menu mode = "horizontal">
                <Menu.Item key = 'home'><Link href = '/'><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key = 'profile'><Link href = '/profile'><a>프로필</a></Link></Menu.Item>
                <Menu.Item key = 'mail'>
                    <Input.Search enterButton style = {{verticalAlign : 'middle'}}/>
                </Menu.Item>
                <Link  href= '/signup'><a><Button>회원가입</Button></a></Link>
            </Menu>
            <Row gutter ={10}>
                <Col xs = {24} md = {6}>
                    {dummy.isLoggedin ?<UserProfile/>:
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