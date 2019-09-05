import produce from 'immer'
export const initalState = {
    isLoggedIn : false, //로그인여부
    isLoggingOut : false, //로그아웃 시도중
    isLoggingIn : false, // 로그인 시도중
    logInErrorReason : '', //로그인 에러 사용
    isSignedUp : false, // 회원가입 성공
    isSigningUp : false, // 회원가입 시도중
    signUpErrorReason : '',  //회원가입 실패사유
    me : null, //내정보
    flolowingList : [], //팔로윙 리스트
    followerList : [], //팔로워 리스트
    userInfo : null // 유저정보
}


export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE"

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' ; //액션의 이름 
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST'
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS'
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE'

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST'
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS'
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE'

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST'
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS'
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE'

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST'
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS'
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE'

export const CLICK_SIGNUP_BUTTON = 'CLICK_SIGNUP_BUTTON'
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'

/* 구현 순서를 생각해보자
    1. 프론트단에서 아이디와 비밀번호를 받아온다.
    2. 받아온 아이디와 비밀번호를 백으로 넘긴다.
    3. 로그인의 성공 여부를 묻고 성공 할 경우 nickname, post, following, follower리스트를 받아온다
    4. 받는 쿼리 select nickname, post, following, followers
                from user join posts using(user.number)
                where userId = 받아온Id 
    5. 이데이터를 user.user state에 저장후에 각각 데이터를 핸들링한다.*/
export const loginRequestAction = (data)=> {
    
    return {
        type : LOG_IN_REQUEST,
        data ,
        isLoading : true
    }
}

export const signupRequestAction = (data)=>{
    return{
        type : SIGN_UP_REQUEST,
        data 
    }
}

export const signUpSuccess ={
    type : SIGN_UP_SUCCESS
}

export const logoutRequestAction ={
    type : LOG_OUT_REQUEST,
    data : {}
}

const user = (state = initalState, action )=>{
    return produce(state ,(draft)=>{
        switch(action.type){
            case LOG_IN_REQUEST :
                draft.isLoggingIn = true
                draft.isLoggedIn = false
                draft.logInErrorReason = ''
                break
                
            case LOG_IN_SUCCESS :{
                return {
                    ...state,
                    isLoggingIn : false,
                    me : action.data,
                    isLoggedIn : true,
                    isLoading: false
                }
            }
            case LOG_IN_FAILURE :{
                return {
                    ...state,
                    isLoggedIn : false,
                    isLoggingIn : false,
                    logInErrorReason : action.error,
                    me : null
                }
            }
           
            case LOG_OUT_REQUEST :{
                return{
                    ...state,
                    isLoggingOut : true
                }
            }
                
            case LOG_OUT_SUCCESS :{
                return{
                    ...state,
                    isLoggingOut : false,
                    isLoggedIn : false,
                    me : null
                }
            }
                
            case LOG_OUT_FAILURE :{
                return {
                    ...state,
                    isLoggingOut : false,
                }
            }
               
    
            case LOAD_USER_REQUEST : {
                return {
                    ...state,
                }
            }
    
            case LOAD_USER_SUCCESS:{
                return {
                    ...state,
                    me : action.data,
                    isLoggedIn : true
                }   
            }
                
            case LOAD_USER_FAILURE :{
                return {
                    ...state,
                } 
            }
                
            case SIGN_UP_REQUEST :{
                return{
                    ...state,
                    isSigningUp : true,
                    isSignedUp:false,
                    signUpErrorReason :''
                }
            }
            case SIGN_UP_FAILURE:{
                return{
                    ...state,
                    isSigningUp : false,
                    isSignedUp : false,
                    signUpErrorReason : action.error
                }
            }
            case SIGN_UP_SUCCESS : {
                return{
                    ...state,
                    isSigningUp : false,
                    isSignedUp: true
                }
            }
    
            case CLICK_SIGNUP_BUTTON :{
                return{
                    ...state,
                    isSignedUp : false,
                }
            }
            
            default : return state
        }
    })
    
}

export default user;