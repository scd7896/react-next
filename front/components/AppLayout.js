import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'
import {Menu, Input, Button, Row, Col, Card, Avatar} from 'antd';

const dummy = {
    nickname : '김서버',
    Post :[],
    Following : [],
    Followers : [],
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
            <Row>
                <Col xs = {24} md = {6}>
                    <Card
                        actions = {[
                            <div key = 'twit'>짹쨱<br />{dummy.Post.length}</div>,
                            <div key = 'twit'>팔로잉<br />{dummy.Following.length}</div>,
                            <div key = 'twit'>팔로워<br />{dummy.Followers.length}</div>,
                        ]}>
                        <Card.Meta avatar = {<Avatar>{dummy.nickname[0]}</Avatar>}
                        title = {dummy.nickname}></Card.Meta> 
                    </Card>
                </Col>
                <Col xs = {24} md = {12}>
                    {children}
                </Col>
                <Col xs = {24} md = {6}>세번째 </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children : PropTypes.node
}
export default AppLayout;