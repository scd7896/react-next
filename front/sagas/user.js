import {all, delay,fork, takeEvery,takeLatest, call,put,take} from 'redux-saga/effects'
import {LOG_OUT_REQUEST,LOG_OUT_FAILURE, LOG_OUT_SUCCESS,LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,SIGN_UP_FAILURE}from '../reducers/user'
import axios from 'axios'


// watch -> watch했을때 작동되는 함수 -> 서버에 데이터 통신하는 api함수
/* 
    제한해서 받아오는 방법 한번에 불러오는 단위 limit 건너뛰는 점은 offset = skip이라고도함
    loadFollwingsApi(userId, offset = 0, limit = 3){
        return axios.get(`/user/${userId||0}/followings?offset=${offset}&limit=${limit}`,{
            withCredentials : true
        })
    }
*/
function loginApi(loginData){
    //TOD 서버에 요청을 보내는 부분
    return axios.post('/user/login', loginData.data,{
        withCredentials : true,//클라이언트에서 보낼때는 브라우저가 쿠키를 보냄
    }) // SSR일 경우는 브라우저가 없다.
}

function* login(action){
    try{
        const result = yield call(loginApi, action.data)
        
        //yield call(loginApi); //서버찍고 다시 올때까지 대기
        yield put({ // PUT은 dispatch 동일
            type : LOG_IN_SUCCESS,
            data : result.data
        })
    }catch(e){ //loginAPI 실패
        console.error(e)
        yield put({
            type : LOG_IN_FAILURE
        })
    }
}

function* watchLogin (){
   yield takeLatest(LOG_IN_REQUEST, login)
    
}

// function* helloSaga (){
//     for (let i = 0 ; i<5; i++){
//         //take가 대충 이벤트리스너라고 생각해도된다.
//         //하지만 무한반복문에 없을경우 한번만 리스닝하게된다.
//         yield take(HELLO_SAGA) //take 함수에 next함수가 있다
//         //그래서 중단점만 잘 정해주고 옆에다가 take함수 잘하도록
//         console.log('사가가 잘 실행됬어~~~')
//     }
// }
function signUpAPI(signUpData){
    //todo
    return axios.post('/user/', signUpData)
}

function* signUp (action){
    try{
        //yield call(signUpAPI);
        yield call(signUpAPI, action.data)
        yield put({
            type : SIGN_UP_SUCCESS
        })
    }catch(e){
        yield put({
            type : SIGN_UP_FAILURE,
            error : e
        })
    }
}

function* watchSignUp(){
    yield takeEvery(SIGN_UP_REQUEST, signUp)
}

function logoutAPI(){
    //todo
    return axios.post('/user/logout',{},{
        withCredentials: true
    })
}

function* logout (){
    try{
        //yield call(signUpAPI);
        yield call(logoutAPI)
        yield put({
            type : LOG_OUT_SUCCESS
        })
    }catch(e){
        yield put({
            type : LOG_OUT_FAILURE,
            error : e
        })
    }
}

function* watchLogout(){
    yield takeEvery(LOG_OUT_REQUEST, logout)
}

function loadUSerAPI(userid){
    //todo
    return axios.get(userid? `/user/${userid}` : '/user/', {
        withCredentials : true,
    })
}

function* loadUSer (action){
    try{
        const result = yield call(loadUSerAPI, action.data)
        yield put({
            type : LOAD_USER_SUCCESS,
            data : result.data,
            me: !action.data
        })
    }catch(e){
        yield put({
            type : LOAD_USER_FAILURE,
            error : e
        })
    }
}

function* watchLoadUSer(){
    yield takeEvery(LOAD_USER_REQUEST, loadUSer)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadUSer),
        fork(watchSignUp) //fork는 순서를 신경 안써도 되는 액션들로 진행 
        //실상 얘네들이 이벤트리스너이니 순서가 무슨상관
    ])
}