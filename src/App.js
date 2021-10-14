
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Admin from './Admin';
import './App.css';
import SeePost from './Components/SeePost/SeePost';
import { fetchPosts } from './redux/ActionCreators/postActionCreators';

function App() {
  
  const isLoading = useSelector(state => state.posts.isLoading );
    
    const dispatch = useDispatch();


  useEffect(() => {
  
    if(isLoading){
      dispatch(fetchPosts())

    }
  }, [isLoading,dispatch])


  return (
    <div className="App text-center" >
      <ToastContainer/>
        <Switch>
          <Route exact path ="/" component={()=><p style={{fontSize:"100px"}}>Welcome to firebase Tutorial</p>} />
          <Route path="/admin" component={()=><Admin/>}></Route>
          <Route path ="/post/:postId" component={()=><SeePost/>}/>

        </Switch>
    </div>
  );
}

export default App;
