import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard'

const Home = ()=>{
    const user = useSelector(state => state.user.user)
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
    const mainPosts = useSelector(state=>state.post.mainPosts)
    const dispatch = useDispatch()
    useEffect(()=>{
        // dispatch({
        //     type : 'LOG_IN',
        //     data :{
        //         nickname : '갓갓서버',
        //         Followers : ['김태경', '하하하', '쓰레기'],
        //         Following : ['이이이', '멍청이'],
        //         Post : ['사사사사']
        //     }
        // })
        dispatch({
            type :'HELLO_SAGA'
        })
        dispatch({
            type :'HELLO_SAGA'
        })
        dispatch({
            type :'HELLO_SAGA'
        })
        dispatch({
            type :'HELLO_SAGA'
        })
    }, [])
    return(
        <div>
            {user ? <div>로그인 했습니다 : {user.nickname}</div>: ''}
            {isLoggedIn && <PostForm />}
            {mainPosts.map((c)=>{
                return(
                    <PostCard c = {c} key = {c}/>
                )
            })}
        </div>
    );
};

export default Home;