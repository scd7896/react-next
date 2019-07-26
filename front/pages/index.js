import React from 'react';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard'

export const dummy = {
    isLoggedIn : true,
    imagePaths : [],
    mainPosts:[{
        User :{
            id:1,
            nickname :'김서버',
        },
        content : 'first commit',
        img : 'https://i.ytimg.com/vi/Bv4cVyL3NXo/maxresdefault.jpg',
    }]
}
const Home = ()=>{
    return(
        <div>
            {dummy.isLoggedIn && <PostForm />}
            {dummy.mainPosts.map((c)=>{
                return(
                    <PostCard c = {c} key = {c}/>
                )
            })}
        </div>
    );
};

export default Home;