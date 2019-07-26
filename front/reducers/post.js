export const initalState = {
    mainPosts : [],
}

const ADD_POST = 'ADD_POST'
const ADD_DUMMY = "ADD_DUMMY"

const addPost = {
    type : ADD_POST
}
const addDummy = {
    type : ADD_DUMMY,
    data :{
        content : 'hello',
        UserId :1,
        User :{
            nickname: '김서버'
        }
    }
}

const post = (state = initalState, action)=>{
    switch(action.type){
        case ADD_POST:
            return{
                ...state,
                mainPosts : [action.data, ...state.mainPosts]
            }                
        case ADD_DUMMY:
            return{
                ...state,
                mainPosts : [action.data, ...state.mainPosts]
            }
    }
}

export default post