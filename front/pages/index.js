import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard'
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import { useCallback } from 'react';

const Home = ()=>{
    const user = useSelector(state => state.user.user)
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
    const {mainPosts, hasMorePost} = useSelector(state=>state.post)
    const onScroll = useCallback(()=>{
        console.log(window.scrollY, document.documentElement.clientHeight,
            document.documentElement.scrollHeight)
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight -300){
            /*여기에다가 추가로 가져오는작업 */
            console.log('데이터를 가져와라')
            if(hasMorePost){
                dispatch({
                    type :LOAD_MAIN_POSTS_REQUEST,
                    lastId : mainPosts[mainPosts.length-1].id
                })
            }
        }
            
    }, [hasMorePost, mainPosts.length])
    useEffect(()=>{
        window.addEventListener('scroll', onScroll)
        return ()=>{
            window.removeEventListener('scroll', onScroll)
        }
    }, [mainPosts.length])
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     // dispatch({
    //     //     type : 'LOG_IN',
    //     //     data :{
    //     //         nickname : '갓갓서버',
    //     //         Followers : ['김태경', '하하하', '쓰레기'],
    //     //         Following : ['이이이', '멍청이'],
    //     //         Post : ['사사사사']
    //     //     }
    //     // })
    //     dispatch({
    //         type : LOAD_MAIN_POSTS_REQUEST
    //     })
    // }, [])
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
Home.getInitialProps = async(context)=>{
    context.store.dispatch({
        type : LOAD_MAIN_POSTS_REQUEST
    })
}

export default Home;