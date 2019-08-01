export const initalState = {
    mainPosts : [
        {
            User :{
                id:1,
                nickname :'김서버',
            },
            content : 'first commit',
            img : 'https://i.ytimg.com/vi/Bv4cVyL3NXo/maxresdefault.jpg',
     
        }
    ],
    imagePaths :[]
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
        default : return {
            ...state
        }
    }
}

export default post