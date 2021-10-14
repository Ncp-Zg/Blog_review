import React from 'react'
import { useEffect } from 'react';
import { Button, Card, Container, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPosts } from '../../../redux/ActionCreators/postActionCreators';


const AllPostsComponent = () => {

    const {isLoading,posts,userId} = useSelector((state) => ({isLoading:state.posts.isLoading,posts:state.posts.posts , userId:state.auth.user_id}),shallowEqual );
    
    const dispatch = useDispatch();
    const history = useHistory();
    

  useEffect(() => {
  
    if(isLoading){
        dispatch(fetchPosts())
      

    }
  }, [isLoading,dispatch]);

  const myPosts = posts && posts.filter(pst=>pst.postData.createdBy === userId);

    console.log(userId)

    return (
        <div>
            <Container fluid>
                <Row className="my-5 px-5 gap-2">

                    {
                        isLoading ? <h1 className="text-center my-5 ">Loading ....</h1>: posts.length < 1|| myPosts.length<1? <h1 className="text-center my-5 "> No Post Found</h1>:
                        myPosts.map((pst,index)=>(
                            <Card className="col-md-8 mx-auto" key={index}>
                                <Card.Img src={pst.postData.image} alt= {pst.postData.title}/>
                                <Card.Body>
                                    <Card.Title>{pst.postData.description.slice(0,100)}...</Card.Title>
                                </Card.Body>
                                <Card.Footer className="bg-white">
                                    <div className="d-flex w-100 px-5 py-2 align-items-center justify-content-between">
                                        <p>Likes 0</p>
                                        <p className="py-1 px-1 bg-dark text-white">{pst.postData.author}</p> 
                                    </div>
                                        <Button type="button" variant="primary" bg="primary" className="my-2 form-control" onClick={()=>history.push(`/post/${pst.postId}`)}>See Post</Button>
                                            <div className="d-flex w-100 px-5 py-2 align-items-center justify-content-end mb-2">
                                                <Button type="button" variant="outline-primary" bg="primary" className="mx-2">Edit Post</Button>
                                                <Button type="button" variant="danger" bg="danger">Delete</Button>

                                            </div>
                                        

                                   
                                    </Card.Footer>
                            </Card>
                        ))


                    }
                    
                </Row>
                {/* {JSON.stringify(myPosts)} */}
            </Container>
            
        </div>
    )
}

export default AllPostsComponent
