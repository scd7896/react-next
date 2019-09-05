import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {useDispatch,useSelector} from 'react-redux'
import { LOAD_HASHTAG_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../components/PostCard';
const Hashtag = ({tag})=>{
    const {mainPosts} = useSelector(state => state.post)
    return(
        <div>
            {mainPosts.map(c=>(
                <PostCard key = {+c.createdAt} c={c}/>
            ))}
        </div>
    )
}
Hashtag.propTypes = {
    tag : PropTypes.string.isRequired
}
/* 누구보다 빠르게 가져온다 서버사이드렌더링이 가능하게 해주는
라이프 사이클이다 */
Hashtag.getInitialProps = async(context)=>{
    console.log('hashtag getinitalprops',context.query.tag)
    const tag = context.query.tag
    context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag
    })
    return { tag}
}

export default Hashtag