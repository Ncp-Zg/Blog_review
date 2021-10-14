import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import ReplyForm from "./ReplyForm";

const SeePost = () => {
  const { postId } = useParams();

  const { isLoading, posts, userId , isLoggedIn} = useSelector(
    (state) => ({ isLoading: state.posts.isLoading, posts: state.posts.posts, userId: state.auth.user_id, isLoggedIn:state.auth.isLoggedIn }),
    shallowEqual
  );

  const currentPost =
    posts.length > 0 && posts.find((pst) => pst.postId === postId);

  if (isLoading) {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center my-5 display-2">Loading Post...</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!isLoading && !currentPost) {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center my-5 display-2">No Post Found..</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <Row>
        <Col md={12}>
          <Image
            style={{ heıght: "650px", width: "100%" }}
            src={currentPost.postData.image}
            alt={currentPost.postData.title}
          />
        </Col>
      </Row>
      <Row className="align-items-center justify-content-between">
        <Col md={6} className="py-5 px-3">
          <p className="display-3">{currentPost.postData.title}</p>
        </Col>
        <Col
          md={5}
          className="d-flex gap-1 align-items-center justify-content-end me-5"
        >
          {currentPost.postData.category.map((cat, index) => (
            <p
              className="py-1 px-2 mr-3 bg-primary text-white"
              key={index + 564}
            >
              {cat}
            </p>
          ))}
        </Col>
      </Row>

      <div className="d-flex">
        <p
          className="card-text text-wrap overflow-hidden px-5 py-0 w-50 text-justify"
          style={{ wordWrap: "wrap", wordBreak: "break-word" }}
        >
          {currentPost.postData.description}
        </p>

        <div className="col-md-6">
          {console.log(currentPost)}
          <CommentForm currentPost={currentPost} />
          <div className="col-md-12 pe-5 mt-5">
            {currentPost.postData.comments.map((comment, index) => (
              <div
                key={index * 12}
                className="w-100 card border border-dark p-5 py-3 my-2"
              >
                <div className="w-100 d-flex align-items-center justify-content-between ">
                  <div className="d-flex">
                    <p className="my-0 text-capitalize text-white bg-dark p-2 px-3 rounded-circle">
                      {comment.name[0]}
                    </p>
                    <div className="mx-2">
                      <p className="my-0 card-title">{comment.name}</p>
                      <p className="my-0 card-text small">{comment.email}</p>
                    </div>
                  </div>
                  <div className="d-flex gap-1 align-items-center justify-content-end">
                    {comment.admin && (
                      <p className="bg-dark text-white py-1 px-2">Admin</p>
                    )}
                    {comment.postOwner && (
                      <p className="bg-dark text-white py-1 px-2">Author</p>
                    )}
                  </div>


                </div>
                <p className="mt-4">{comment.comment}</p>

                <ReplyForm comment={comment} currentPost={currentPost}/>

                <p>{
                  comment.reply.map((rply,index)=>(
                    <div key={index*61165} className="card my-1 ms-4 col-md-12 d-flex " >
                     
                      <div className="col-md-12 my-0 card-group d-flex " style={{justifyContent:"space-between"}}>
                        
                        
                        <p className="d-flex">
                          <div className="mt-1 ms-1 px-3 pb-2 pt-2 text-white bg-success rounded-circle ">{rply.name[0].toUpperCase()}</div>
                          <div>
                            <div className="my-0 d-flex small ms-1 " style={{justifyContent:"flex-start",fontWeight:"bold"}}>{rply.name}</div>
                            <div className=" my-0 ms-2 card-group small">{rply.email}</div>
                          </div>
                          
                      </p>

                       <div className="d-flex me-2" >

                         { rply.admin ? (<p className="bg-dark text-white mt-2 mb-4 px-1 me-1 ms-1">Admin</p>) : (null)}
                          { rply.ownerId === currentPost.postData.createdBy ? (<p className="bg-dark text-white pb-1 px-1 mt-2 mb-4">Author</p> ) : (null)}
                       </div>
                          
                              
                          
                          
                      
                      </div>


                      
                        

                        
                      
                      <div className="card-text small mt-3">
                        <p>
                          {rply.reply}
                        </p>
                        
                      </div>
                    

                    
                    </div>
                    
                  ))
                  }</p>



              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SeePost;
