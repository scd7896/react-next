import React, {useState, useCallback} from 'react';

import {Form, Input, Checkbox, Button} from 'antd'

export const useInput = (initValue = '')=>{
    const [value, setter] = useState(initValue)
    const handler = useCallback((e)=>{
        setter(e.target.value)
    },[])
    return [value, handler]
}

const Signup = ()=>{
    const [passwordChk, setPasswordChk] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const [termError, setTermError] = useState(false);

    

    const [id, onChangeId] = useInput('');
    const [password, onChangePass] = useInput('');
    const [nick, onChangeNick] = useInput('');

    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        if(password !== passwordChk){
            return setPasswordError(true)
        }
        if(term === false){
            return setTermError(true)
        }
    },[password,passwordChk,term])

    const onChangeTerm = useCallback((e)=>{
        setTermError(false)
        setTerm(e.target.checked)
    }, [])
    const onChangeChk = useCallback((e)=>{
        setPasswordError(e.target.value !== password)
        setPasswordChk(e.target.value)
    }, [password])
    
    return(
        <>
                <Form onSubmit = {onSubmit} style = {{ padding : 10 }}>
                    <div>
                        <label htmlFor = 'user-id'>아이디</label>
                        <br></br>
                        <Input name = 'user-id' value = {id} required onChange = {onChangeId}/>
                    </div>
                    <div>
                        <label htmlFor = 'user-nick'>닉네임</label>
                        <br></br>
                        <Input name = 'user-nick' value = {nick} required onChange = {onChangeNick}/>
                    </div>
                    <div>
                        <label htmlFor = 'user-pass'>비밀번호</label>
                        <br></br>
                        <Input name = 'user-pass' value = {password} type = 'password' required onChange = {onChangePass}/>
                    </div>
                    <div>
                        <label htmlFor = 'user-pass-chk'>비밀번호체크</label>
                        <br></br>
                        <Input name = 'user-pass-chk' value = {passwordChk} type ='password' required onChange = {onChangeChk}/>
                        {passwordError && <div style = {{color:'red'}}>비밀번호가 일치하지않습니다.</div>}
                    </div>
                        <Checkbox name = 'user-term' value = {term} onChange = {onChangeTerm}>킹갓서버의 말을 잘들을 것을 동의합니다.</Checkbox>
                        {termError && <div style ={{color: 'red'}}>약관에 동의 하셔야합니다</div>}
                    <div style = {{marginTop : 10}}>
                        <Button type = 'primary' htmlType = 'submit'> 가입하기</Button>
                    </div>
                </Form>
        </>
    )
}

export default Signup