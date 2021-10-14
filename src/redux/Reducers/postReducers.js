import { ADD_COMMENT, ADD_POST, ADD_REPLY, RESET_POSTS, SET_LOADING, SET_POSTS } from "../ActionTypes/postTypes";

const initialState = {
    isLoading: true,
    posts: []
};


const postReducers = ((state=initialState,{type,payload})=>{
    switch(type){
        case SET_LOADING:
        state = {...state,isLoading:payload}
        return state;
        case ADD_POST:
        state= { ...state, posts:[ ...state.posts, payload]}
        return state;
        case SET_POSTS:
        state={...state,posts:payload}
        return state;
        case RESET_POSTS:
        state =initialState;
        return state;
        case ADD_COMMENT:
        // const findPost = state.posts.find(pst=>pst.postId === payload.postId);
        // const OldComments = findPost.postData.comments;
        // OldComments.push(payload.cmnt);
        // findPost.postData.comments=OldComments;
        state={...state,posts:state.posts.map(post=>post.postId === payload.postId ? payload.oldComments && post : post)}
        return state;

    //     case ADD_COMMENT:
    //   state = {
    //     ...state,
    //     posts: state.posts.map((pst) =>
    //       pst.postId === payload.postId
    //         ? pst.postData.comments.push(payload.data) && pst
    //         : pst
    //     ),
    //   };
    //   return state;


        case ADD_REPLY:
            const currentPost = state.posts.find(pst=>pst.postId === payload.postId);
            currentPost.postData.comments=payload.allComments
            
            state={...state,posts:state.posts.map(post=>post.postId === payload.postId ? currentPost : post)}
            return state;


        default:
            return state;
    }
})

export default postReducers