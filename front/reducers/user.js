const dummyUsers = {
    nickname: '김갓',
    Post : [],
    Following : [],
    Followers : [] ,
}
export const initalState = {
    isLoggedIn : false,
    user : {
        nickname : '',
        Following :[],
        Followers : [],
        Post : [],
    },
    isLoading : false,
    signUpData : {
        id : '',
        password : '',
        nickname : ''
    },
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


/* 구현 순서를 생각해보자
    1. 프론트단에서 아이디와 비밀번호를 받아온다.
    2. 받아온 아이디와 비밀번호를 백으로 넘긴다.
    3. 로그인의 성공 여부를 묻고 성공 할 경우 nickname, post, following, follower리스트를 받아온다
    4. 받는 쿼리 select nickname, post, following, followers
                from user join posts using(user.number)
                where userId = 받아온Id 
    5. 이데이터를 user.user state에 저장후에 각각 데이터를 핸들링한다.*/
export const loginAction = (nickname)=> {
    return {
        type : LOG_IN_REQUEST,
        data :{
            nickname : nickname,
            Following :[],
            Followers : [],
            Post : [],
        },
        isLoading : true
    }
}

export const signupAction = (data)=>{
    return{
        type : SIGN_UP_REQUEST,
        data 
    }
}

export const logoutAction ={
    type : LOG_OUT_REQUEST,
    data : {}
}

const user = (state = initalState, action )=>{
    switch(action.type){
        case LOG_IN_REQUEST :
            return {
                ...state,
                isLoggedIn : true,
                user : {
                    nickname : action.data.nickname,
                    Followers : action.data.Followers ? action.data.Followers : [],
                    Following : action.data.Following ? action.data.Following : [],
                    Post : action.data.Post ? action.data.Post : [],
                },
                isLoading : action.isLoading
            }
        case LOG_IN_SUCCESS :{
            return {
                ...state,
                isLoading : false,
            }
        }
        case LOG_OUT_REQUEST :
            return{
                ...state,
                isLoggedIn : false,
                user : null,
                isLoading :true
            }
        case SIGN_UP_REQUEST :{
            
            return{
                ...state,
                signUpData : action.data,
                isLoading : true
            }
        }
       
        default : return state
    }
}

export default user;