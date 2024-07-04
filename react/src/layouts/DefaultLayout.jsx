import { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Navbar from '../components/Navbar';
import Header from '../components/RequestModule/Header';
import axiosClient from '../axios-client';



const DefaultLayout = () => {
    const {user, token, setUser, setToken} = useStateContext();

    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])

    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
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
