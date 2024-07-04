import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Navbar from '../components/Navbar';
import Header from '../components/RequestModule/Header';



const DefaultLayout = () => {
    const {user, token} = useStateContext();

    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault();
    }
  return (
    <div>
        <Navbar/>
        <Header/>

        <main>



    </main>



        <h1>Default </h1>
        <p>Hi, User {user.name} </p>
        <a href="#" onClick={onLogout} className="btn btn-primary">Logout</a>
        <Outlet/>
    </div>
  )
}

export default DefaultLayout
