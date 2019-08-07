import {all, delay,fork, takeEvery,takeLatest, call,put,take} from 'redux-saga/effects'
import {LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,SIGN_UP_FAILURE}from '../reducers/user'
import axios from 'axios'

// watch -> watch했을때 작동되는 함수 -> 서버에 데이터 통신하는 api함수

function loginApi(loginData){
    //TOD 서버에 요청을 보내는 부분
    return axios.post('/login', loginData)
}

function* login(action){
    try{
        call(loginApi, action.data)
        //yield call(loginApi); //서버찍고 다시 올때까지 대기
        yield put({ // PUT은 dispatch 동일
            type : LOG_IN_SUCCESS
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
    return axios.post('http://localhost:3065/api/user/', signUpData)
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

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchSignUp) //fork는 순서를 신경 안써도 되는 액션들로 진행 
        //실상 얘네들이 이벤트리스너이니 순서가 무슨상관
    ])
}