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
  return (
    <div>
        <Navbar/>
        <Header/>

        <main>



    </main>



        <h1>Default </h1>
        <Outlet/>
    </div>
  )
}

export default DefaultLayout
