import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { doComment } from '../../redux/ActionCreators/postActionCreators'

const CommentForm = ({currentPost}) => {

    const {IsLoggedIn,user} = useSelector(state=>({IsLoggedIn:state.auth.isLoggedIn,user:state.auth}),shallowEqual)

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [comment,setComment] = useState("")

    const dispatch = useDispatch();

    console.log(currentPost)



    
    const handleSubmit = (e)=>{
        e.preventDefault();

        

        if(IsLoggedIn){
            if(!comment) return toast.dark("please add comment!");
            const data = {
                postOwner:currentPost.postData.createdBy === user.user_id,
                admin:IsLoggedIn,
                comment,
                name:user.user.displayName,
                email:user.user.email,
                reply:[],
                userId:user.user_id,
                commentId:currentPost.postData.comments.length

            }
            dispatch(doComment(data,currentPost.postId,currentPost.postData.comments))
            setName("")
            setComment("")
            setEmail("")
            
        }

        else{
            if(!comment || !name || !email) return toast.dark("please fill in all fields!");
            const data = {
                    postOwner:false,
                    admin:IsLoggedIn,
                    comment,
                    name,
                    email,
                    reply:[],
                    userId:null,
                    commentId:currentPost.postData.comments.length
    
            
            }
            dispatch(doComment(data,currentPost.postId,currentPost.postData.comments))
            setName("")
            setComment("")
            setEmail("")
        }
    }



    return (
     
        <form className="w-100 pe-5" onSubmit={handleSubmit}>
           {
               IsLoggedIn ? (
                <div className="form-group mb-2">
                <textarea className="form-control" placeholder="Comment..." value={comment} onChange={e=>setComment(e.target.value)}></textarea>
            </div>
               ) : (<>
                <div className="form-group d-flex mb-2 gap-2">
                <input type="text" className="form-control" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
                <input type="email" className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
                <div className="form-group mb-2">
                <textarea type="text" className="form-control" placeholder="Comment..." value={comment} onChange={e=>setComment(e.target.value)}></textarea>
            </div></>
               )
           } 
           <div className="form-group d-flex mb-2 gap-2">
                <input type="submit" className="form-control btn btn-primary" value="Add Comment" />
            </div>
           </form>
      
    )
}

export default CommentForm
