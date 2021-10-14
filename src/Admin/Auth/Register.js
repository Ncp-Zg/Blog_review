import React, {useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../config/firebase'
import { loginUser } from '../../redux/ActionCreators/authActionCreators'

const Register = () => {

    const [email,setEmail]=useState("")
    const [fullName,setFullName]=useState("")
    const [pass,setPass]=useState("")
    const [confirmPass,setConfirmPass]=useState("")

    const dispatch=useDispatch();
    const history = useHistory()


    const handlesubmit = (e)=>{
        e.preventDefault();

        if(!email || !pass) return toast.info("Please fill in all blanks")

        if (pass.length <8 ) return toast.info("password must be of length 8 or greater!")


        if (pass !== confirmPass) 
        return toast.info("Password do not match")



        //register the user

        auth.createUserWithEmailAndPassword(email,pass).then(()=>{

            
            auth.currentUser.updateProfile({
                displayName:fullName
            }).then(()=>{
                const user = auth.currentUser;
                console.log(user)
                const data = {
                    user:user.providerData[0],
                    id:user.uid
                };

                dispatch(loginUser(data));
                toast.success("you are registered and logged in successfully")
                history.push("/admin/dashboard")
                
            }).catch(err=>{
                console.log(err)
            })
            // add data to redux

            

        }).catch(err=>{
            console.log(err)

        })


    }


    return (
        <Container>
            <Row>
                <h1 className="text-dark font-weight-bold text-center py-5">
                    React Firebase Simple Blog {" "}
                    <span className="text-primary">[Admin]</span>{" "}
                    </h1>
                    <Col md={5} sm={12} xm={12} className="mx-auto p-3 my-5">
                        <Form onSubmit = {handlesubmit}>
                            <Form.Group controlId={"fullNameBasicForm"} className="my-2">
                                <Form.Control type="text" placeholder={"Full name"} value={fullName} onChange = {e=>setFullName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId={"fullEmailBasicForm"} className="my-2">
                                <Form.Control type="email" placeholder={"Email"} value={email} onChange = {e=>setEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId={"fullPasswordBasicForm"} className="my-2">
                                <Form.Control type="password" placeholder={"Password"} value={pass} onChange = {e=>setPass(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId={"fullConfirmPassBasicForm"} className="my-2">
                                <Form.Control type="password" placeholder={"Re-Type Password"} value={confirmPass} onChange = {e=>setConfirmPass(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId={"fullSubmitBasicForm"} className="my-5">
                                <Button type="submit" variant={"dark"} bg="dark" className="form-control">
                                    Register
                                </Button>
                            </Form.Group>
                           
                            
                            
                            
                        </Form>
                        </Col>
            </Row>
        </Container>
    )
}

export default Register
