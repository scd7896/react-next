import React from 'react'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import {Card, Avatar} from 'antd'
import { LOAD_USER_REQUEST } from '../reducers/user';

const User = ({id})=>{

    const {mainPosts} = useSelector(state => state.post)
    const {userInfo} = userSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch({
            type : LOAD_USER_REQUEST,
            data: id
        })
        dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: id
        })
    },[])
    return(
        <div>
            {userInfo ?
                <Card
                    actions = {[
                        <div key = 'twit'>
                            짹쨱
                            <br />
                            {userInfo.Post}
                        </div>,
                        <div key = "following">
                            팔로잉
                            <br />
                            {userInfo.Followings}
                        </div>,
                        <div key = "follower">
                            팔로워
                            <br />
                            {userInfo.Followers}
                        </div>
                    ]}
                >
                    <Card.Meta 
                        avatar = {<Avatar>{userInfo.nickname[0]}</Avatar>}
                        title = {userInfo.nickname}
                    />
                </Card>
                 :null}
            {mainPosts.map(c=>(
                <PostCard key = {+c.createdAt} post={c}/>
            ))}
        </div>
    )
}
User.getInitialProps = async(context)=>{
    console.log('User의 getInitialProps는 ' , context.query.id)
    return {id: parseInt(context.query.id, 10)}
}

export default User