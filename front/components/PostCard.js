import React, {useState, useCallback, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Card, Avatar, Icon, Input, Comment, Form, List} from 'antd'
import Link from 'next/link'
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST } from '../reducers/post';
import PostImages from './PostImages'
const PostCard = ({c})=>{
    const [commentFormOpend, setCommentFormOpend] = useState(false);
    const [commentText, setCommentText] = useState('');
    const {me} = useSelector(state=> state.user);
    
    const {commentAdded, isAddingComment} = useSelector(state=>state.post)
    const dispatch = useDispatch();
    const liked = me && c.Likers && c.Likers.find(v => v.id === me.id)
    const onToggleComment = useCallback(()=>{
        
        setCommentFormOpend(prev => !prev);
        if(!commentFormOpend){
            dispatch({
                type : LOAD_COMMENTS_REQUEST,
                data : c.id
            })
        }
    }, []);

    const onSubmitComment = useCallback((e)=>{
        e.preventDefault()
        if(!me){
            return alert('로그인 필요합니다')
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data : {
                postId : c.id,
                content :commentText
            }
        })
    }, [me && me.id, commentText]);

    const onChangeCommentText = useCallback ((e)=>{
        setCommentText(e.target.value)
    }, [commentAdded])

    useEffect(()=>{
        setCommentText('');
    }, [commentAdded === true])
    const onToggleLike = useCallback(()=>{
        if(!me){
            return alert('로그인이 필요하니다')
        }
        if(liked){//좋아요 누른 상태
            return dispatch({
                type: UNLIKE_POST_REQUEST,
                data: c.id
            })
        }else{ //좋아요 안 누른 상태
            dispatch({
                type : LIKE_POST_REQUEST,
                data : c.id
            })
        }   
    },[me && me.id, c && c.id, liked])
    return(
        <div>
            <Card
                key = {+c.createdAt}
                cover = {c.Images[0] && <PostImages images = {c.Images}/>}
                actions = {[
                    <Icon type ='retweet' key = 'retweet' />,
                    <Icon type ='heart' theme={liked ? 'twoTone':'outlined'} twoToneColor= "#eb2f96" key = 'heart' onClick = {onToggleLike}/>,
                    <Icon type ='message' key = 'message' onClick ={onToggleComment}/>,
                    <Icon type ='elipsis' key = 'elipsis' />
                ]}
                extra ={<Button>팔로우</Button>}>
                    <Card.Meta
                        avatar ={<Link href = {{pathname: '/user', query :{id: c.User.id}}}
                        as = {`/user/${c.User.id}`}><a><Avatar>{c.User.nickname[0]}</Avatar></a></Link>}
                        title = {c.User.nickname}
                        description = {<div>{c.content.split(/(#[^\s]+)/g).map((v)=>{
                            if(v.match(/#[^\s]+/g)){
                                return(
                                    <Link href = {{pathname : `/hashtag`, query:{tag : v.slice(1)}}} 
                                    as ={`/hashtag/${v.slice(1)}`} key = {v}><a>{v}</a></Link>
                                )
                            }
                            return v
                        })}</div>}
                    ></Card.Meta>
            </Card>        
            {commentFormOpend && (
                <>
                    <Form onSubmit = {onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows = {4} value = {commentText} onChange={onChangeCommentText}></Input.TextArea>
                        </Form.Item>
                        <Button type = "primary" htmlType = "submit" loading = {isAddingComment}>삐약</Button>
                    </Form>
                    <List 
                        header = {`${c.Comments? c.Comments.length : 0} 댓글`}
                        itemLayout = "horizontal"
                        dataSource = {c.Comments || []} //데이터의 정보 배열을 가지고오고
                        renderItem = {item =>( // 여기서 그 하나의 아이템으로 렌더링한다.
                            <li>
                                <Comment   author = {item.User.nickname}
                                    avatar = {<Link href = {{pathname : '/user', query: {id: item.User.id}}}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                                    content = {item.content}></Comment>
                            </li>
                        )}></List>
                </>
            )}
        </div>
    )
}

PostCard.propTypes={
    c : PropTypes.shape({
        User : PropTypes.object,
        content : PropTypes.string,
        img : PropTypes.string,
        createdAt : PropTypes.object
    })
}
export default PostCard