import {all, fork, takeLatest, put, delay} from 'redux-saga/effects'
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from '../reducers/post';



function addCommentAPI(){

}

function* addComment(action){
    try{
        //yield call(signUpAPI);
        yield delay(2000)
        yield put({
            type : ADD_COMMENT_SUCCESS,
            data :{
                postId : action.data.postId
            }
        })
    }catch(e){
        console.error(e)
        yield put({
            type : ADD_COMMENT_FAILURE,
            error : e
        })
    }
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function addPostAPI(){

}

function* addPost(){
    try{
        //yield call(signUpAPI);
        yield delay(2000)
        yield put({
            type : ADD_POST_SUCCESS
        })
    }catch(e){
        console.error(e)
        yield put({
            type : ADD_POST_FAILURE,
            error : e
        })
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment)
    ])
}