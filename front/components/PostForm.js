import React, { useCallback, useState, useEffect, useRef } from 'react'
import {Form, Input, Button} from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import { REMOVE_IMAGE,ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
const PostForm = ()=>{
    const {imagePaths, isAddingPost,addedPost} = useSelector(state => state.post)
    const [text, setText] = useState('');
    const dispatch = useDispatch()
    const imageInput = useRef()

    useEffect(()=>{
        setText('');
    },[addedPost === true])

    const onSubmitForm = useCallback((e)=>{
        e.preventDefault();
        if(!text || !text.trim()){
            return alert('게시글 작성하세요')
        }
        const formData = new FormData()
        imagePaths.forEach((i)=>{
            formData.append('image', i)
        })
        formData.append('content', text)
        dispatch({
            type: ADD_POST_REQUEST,
            data : formData,
            
        })
    }, [text, imagePaths])

    const onChangeText = useCallback((e)=>{
        setText(e.target.value)
    },[])

    const onChangeImage = useCallback((e)=>{
        console.log(e.target.files)
        const imageFormdata = new FormData();
        [].forEach.call(e.target.files, (f)=>{
            imageFormdata.append('image', f)
        })
        dispatch({
            type : UPLOAD_IMAGES_REQUEST,
            data : imageFormdata
        })
    },[])

    const onClickImageUpload =useCallback( (e) => {
        imageInput.current.click()
    },[imageInput.current])

    const onRemoveImage = useCallback(index => (e) => {
        dispatch({
            type: REMOVE_IMAGE,
            index
        })
    })
    return(
        <Form style = {{marginBottom :20}} encType = 'multipart/form-data' onSubmit = {onSubmitForm}>
                <Input.TextArea maxLength = {140} placeholder = "어떤신기한일이?" value = {text} onChange = {onChangeText}></Input.TextArea>
                <div>
                    <input type = 'file' multiple hidden ref = {imageInput} onChange={onChangeImage}/>
                    <Button onClick = {onClickImageUpload}>이미지 업로드</Button>
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
                                    <Button onClick = {onRemoveImage(i)}>제거</Button>
                                </div> 
                            </div>      
                        )
                    })}
                </div>
            </Form>
    )
}

export default PostForm