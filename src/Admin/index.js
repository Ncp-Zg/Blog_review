import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import { auth } from '../config/firebase';
import { loginUser } from '../redux/ActionCreators/authActionCreators';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './Dashboard';



const Admin = () => {


    const {path} = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        auth.onAuthStateChanged(user=>{
            if(user===null){
                //user is not logged in
                history.push("/admin/login")
                return;  
            }

            const data = {
                user:user.providerData[0],
                id:user.uid
            }
            dispatch(loginUser(data));
            history.push("/admin/dashboard")
        


        })
    }, [])

    return (
        <div>
            <Switch>
                <Route exact path={path} component={()=><h1>Admin Route</h1>}/>
                <Route path={`${path}/login`} component={()=><Login/>}/>
                {/* <Route path={`${path}/register`} component={()=><Register/>}/> */}
                <Route path={`${path}/dashboard`} component={()=><Dashboard/>}/>
            </Switch>
        </div>
    )
}

export default Admin
