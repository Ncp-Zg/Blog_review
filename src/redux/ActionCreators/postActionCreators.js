
import { toast } from "react-toastify";
import { firestore, storage } from "../../config/firebase";
import { ADD_COMMENT, ADD_POST, ADD_REPLY, RESET_POSTS, SET_LOADING, SET_POSTS } from "../ActionTypes/postTypes";

const setLoading = (data)=>({
    type: SET_LOADING,
    payload:data
});
const addPosts = (data)=>({
    type: ADD_POST,
    payload:data
});

const getPosts = (data)=>({
    type: SET_POSTS,
    payload:data
});

const resetPosts = ()=>({
    type:RESET_POSTS
})


const addComment = (data)=>({
    type:ADD_COMMENT,
    payload:data
})


const addReply = (data) => ({
    type:ADD_REPLY,
    payload:data
})



export const doPosts = (data,image,setProgress) =>dispatch=>{
    

        firestore.collection("posts").add(data).then(async res=>{
            const document = await res.get();
            const postData = {postData:document.data(),postId:document.id};
            const uploadRef = storage.ref(`/posts/${document.id}`);

        uploadRef.put(image).on("state_change",(snapshot)=>{
            const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);

            setProgress(progress)

        },(err)=>{console.log(err)},
          async ()=>{
              const url = await uploadRef.getDownloadURL() 
              firestore.collection("posts").doc(document.id).update({
                  image:url
              }).then(()=>{
                    postData.postData.image=url;
                    dispatch(addPosts(postData))
                    toast.success("Post created successfully!!")
              }).catch(err=>console.log(err))

              
          }
        )

        }).catch(err=>console.log(err))
    
}  

export const fetchPosts = (data)=>dispatch=>{
    dispatch(setLoading(true))


    firestore.collection("posts").get().then(posts=>{

        const allPosts = [];

        posts.forEach(posts =>{
            const data = {postData:posts.data(),postId:posts.id}
            allPosts.push(data);
        });

        dispatch(getPosts(allPosts))
        dispatch(setLoading(false))

    }).catch(err=>{
        console.log(err)
        toast.error(err)
    })
}

export const doComment = (data,postId,prevComments)=> dispatch=>{
    const oldComments = prevComments;
    oldComments.push(data);
    
    firestore.collection("posts").doc(postId).update({
        comments:oldComments
    }).then(()=>{        
        toast.success("comment added successfully")
        dispatch(addComment({cmnt:data,postId,oldComments}))

    }).catch(err=>toast.error(err))
}



export const doReply = (data,oldComment,postId,allComments)=> dispatch => {

    const updatedComment = oldComment;
    updatedComment.reply.push(data);
    

    const findComment = allComments.find(cmt=>cmt.commentId === allComments.indexOf(updatedComment))
    console.log(findComment)


    console.log(allComments)
    // console.log(allComments.splice(findComment.commentId,1,findComment))


    firestore.collection("posts").doc(postId).update({
        comments:allComments
    }).then( ()=>{
        toast.success("reply added successfully")
         dispatch(addReply({postId,allComments}))
        
    }).catch(err=>console.log(err))







}