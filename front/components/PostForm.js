import React, { useCallback, useState, useEffect } from 'react'
import {Form, Input, Button} from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import { ADD_POST_REQUEST } from '../reducers/post';
const PostForm = ()=>{
    const {imagePaths, isAddingPost,addedPost} = useSelector(state => state.post)
    const [text, setText] = useState('');
    const dispatch = useDispatch()

    useEffect(()=>{
        setText('');
    },[addedPost === true])

    const onSubmitForm = useCallback((e)=>{
        e.preventDefault();
        dispatch({
            type: ADD_POST_REQUEST,
            data : {
                text,
            }
        })
    }, [])

    const onChangeText = useCallback((e)=>{
        setText(e.target.value)
    },[])
    return(
        <Form style = {{marginBottom :20}} encType = 'multipart/form-data' onSubmit = {onSubmitForm}>
                <Input.TextArea maxLength = {140} placeholder = "어떤신기한일이?" value = {text} onChange = {onChangeText}></Input.TextArea>
                <div>
                    <input type = 'file' multiple hidden/>
                    <Button>이미지 업로드</Button>
                    <Button type = 'primary' style ={{float:'right'}} loading = {isAddingPost}
                    htmlType = 'submit'>짹쨱</Button>
                </div>
                <div>
                    {imagePaths.map((v,i)=>{
                        return(
                            <div key = {i} stye ={{display:'inline-block'}}>
                                <img src ={`http://localhost:3065/${v}`} style ={{width:'200px'}}
                                alt = {v}/>}
                                <div>
                                    <Button>제거</Button>
                                </div> 
                            </div>      
                        )
                    })}
                </div>
            </Form>
    )
}

export default PostForm