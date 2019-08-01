import React from 'react'
import {Form, Input, Button} from 'antd'
import {useSelector} from 'react-redux'
const PostForm = ()=>{
    const {imagePaths} = useSelector(state => state.post)
    return(
        <Form style = {{marginBottom :20}} encType = 'multipart/form-data'>
                <Input.TextArea maxLength = {140} placeholder = "어떤신기한일이?"></Input.TextArea>
                <div>
                    <input type = 'file' multiple hidden/>
                    <Button>이미지 업로드</Button>
                    <Button type = 'primary' style ={{float:'right'}}
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