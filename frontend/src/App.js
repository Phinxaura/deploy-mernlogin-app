import logo from './logo.svg';
import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefreshHandler from './pages/RefreshHandler';
//if the user didn't click the logout button till then we have to make the user availaible on login page 
//on home page if user want to go on login signup without logout then it should it redirect on home page..
//so that type of functionality is known as private routing ....
function App() {
  //in this we are checking that in licalstorage if user has token then he can request any page otherwise if he try to request home then he will redirect to home initally the authentication is false becoz no user is signed in....
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login"/>
  }
  return (
    <div className="App">
      {/* //in RefreshHandler we check token is there then do true  */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element = {<Navigate to = "/login"/>}/>
        <Route path='login' element = {<Login/>}/>
        <Route path='signup' element = {<Signup/>}/>
        {/* <Route path='home' element = {<Home/>}/> */}
        <Route path='home' element = {<PrivateRoute element = {<Home/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
