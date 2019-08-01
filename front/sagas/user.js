import {all, delay,fork, takeEvery,takeLatest, call,put,take} from 'redux-saga/effects'
import {LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE}from '../reducers/user'

const HELLO_SAGA = 'HELLO_SAGA'

function loginApi(){
    //TOD 서버에 요청을 보내는 부분
}

function* login(){
    try{
        yield call(loginApi); //서버찍고 다시 올때까지 대기
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
function* hello(){
    //비동기처리가 여러번있었는데 그중 한번에만 반응을 하고싶을때 사용
    //여러번 비동기처리가 있으면 다 유효시킬꺼면 takeEvery
    yield delay(1000)
    yield put({
        type : 'BYE_SAGA'
    })
}

function* watchHello (){
    yield takeLatest(HELLO_SAGA, hello)
    
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchHello) //fork는 순서를 신경 안써도 되는 액션들로 진행 
        //실상 얘네들이 이벤트리스너이니 순서가 무슨상관
    ])
}