import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { doReply } from '../../redux/ActionCreators/postActionCreators';

const ReplyForm = ({comment,currentPost}) => {

    const {isLoggedIn,user} = useSelector(state=>({isLoggedIn:state.auth.isLoggedIn,user:state.auth}),shallowEqual)
    const dispatch=useDispatch();

    const [openReplyForm,setOpenReplyForm] = useState(false);
    const [reply,setReply] = useState("");
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")

    console.log(comment)
    

    const handleSubmit = (e) =>{
        e.preventDefault();

       

        if(isLoggedIn){
           const data ={
            name:user.user.displayName,
            email:user.user.email,
            ownerId:user.user_id,
            admin:isLoggedIn,
            reply,

            } 

            dispatch(doReply(data,comment,currentPost.postId,currentPost.postData.comments))
            setName("")
            setReply("")
            setEmail("")
        }


        else{
            const data ={
                name,
                email,
                ownerId:false,
                admin:isLoggedIn,
                reply,
    
                } 
                dispatch(doReply(data,comment,currentPost.postId,currentPost.postData.comments))
            setName("")
            setReply("")
            setEmail("")

        }
    }




    return (
        <div>
            {
                openReplyForm ? ( isLoggedIn ? 
                    (<form className="mt-5" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <textarea placeholder="Do reply.." className="form-control" value={reply} onChange={(e)=>setReply(e.target.value)}/>
                    </div>
                    <div className="form-group mt-4">
                        <button  type="submit" className="btn btn-primary me-3">Reply</button>
                        <button  type="button" className="btn text-danger" onClick={()=>setOpenReplyForm(false)}>Cancel</button>
                    </div>
                    </form>) : ( <>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group d-flex mb-2 gap-2">
                        <input type="text" className="form-control" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
                    </div>
                        <div className="form-group mb-2">
                        <textarea type="text" className="form-control" placeholder="Comment..." value={reply} onChange={e=>setReply(e.target.value)}></textarea>
                    </div>
                    <div className="form-group mt-4">
                        <button  type="submit" className="btn btn-primary me-3">Reply</button>
                        <button  type="button" className="btn text-danger" onClick={()=>setOpenReplyForm(false)}>Cancel</button>
                    </div>
                    </form> </>
                    )

                    
                ) : (
                    <p className="btn text-primary mt-5" onClick={()=>setOpenReplyForm(true)}>
                        Reply
                    </p>
                )
            
            }
            <div className="mt-3">
                <div>







                    {/* {
                        currentPost.postData.comments.map(cmt=>(
                            <p>
                            {
                                cmt.reply.map(rply=>(
                                    <p>
                                        {
                                            rply.reply
                                        }
                                    </p>
                                ))
                            }
                            </p>
                        ))
                    } */}




                    {/* {
                        currentPost.postData.comments.map(cmt =>
                            {
                                // console.log(cmt)
                                cmt.reply.map(rply=>(
                                    <p>
                                        {rply.reply}
                                        {console.log(rply.reply)}
                                    </p>
                                ))
                            }
                        )
                    } */}
                </div>
            </div>
        </div>
    )
}

export default ReplyForm
