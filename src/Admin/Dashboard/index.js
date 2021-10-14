import React from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import Register from '../Auth/Register';
import AddPostComponent from './AddPost/AddPostComponent';
import AllPostsComponent from './AllPosts/AllPostsComponent';
import NavbarComponent from './Navbar/NavbarComponent'

const Dashboard = () => {

    const {path} = useRouteMatch();


    return (
        <div>
            {!path.includes("addUser") && <NavbarComponent/>}
            <Switch>
                <Route exact path={path}>

                    <h1>Dashboard</h1>
                    <Link to="/admin/dashboard/addUser">Add User</Link>
                </Route>
                <Route path={`${path}/addPost`} component={()=><h1><AddPostComponent/></h1>}/>
                <Route path={`${path}/posts`} component={()=><AllPostsComponent/>}/>
                <Route path={`${path}/addUser`} component={()=><Register/>}/>
            </Switch>
        </div>
    )
}

export default Dashboard
