import React, {useState, useCallback, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Card, Avatar, Icon, Input, Comment, Form, List} from 'antd'
import Link from 'next/link'
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({c})=>{
    const [commentFormOpend, setCommentFormOpend] = useState(false);
    const [commentText, setCommentText] = useState('');
    const {me} = useSelector(state=> state.user);
    const {commentAdded, isAddingComment} = useSelector(state=>state.post)
    const dispatch = useDispatch();

    const onToggleComment = useCallback(()=>{
        
        setCommentFormOpend(prev => !prev);
    }, []);

    const onSubmitComment = useCallback((e)=>{
        e.preventDefault()
        if(!me){
            return alert('로그인 필요합니다')
        }
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data : {
                postId : c.id
            }
        })
    }, [me && me.id]);

    const onChangeCommentText = useCallback ((e)=>{
        setCommentText(e.target.value)
    }, [commentAdded])

    useEffect(()=>{
        setCommentText('');
    }, [commentAdded === true])

    return(
        <div>
            <Card
                key = {+c.createdAt}
                cover = {c.img && <img alt ='example' src = {c.img}></img>}
                actions = {[
                    <Icon type ='retweet' key = 'retweet' />,
                    <Icon type ='heart' key = 'heart' />,
                    <Icon type ='message' key = 'message' onClick ={onToggleComment}/>,
                    <Icon type ='elipsis' key = 'elipsis' />
                ]}
                extra ={<Button>팔로우</Button>}>
                    <Card.Meta
                        avatar ={<Avatar>{c.User.nickname[0]}</Avatar>}
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
                                    avatar = {<Avatar>{item.User.nickname[0]}</Avatar>}
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