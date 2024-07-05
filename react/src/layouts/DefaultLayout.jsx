import { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Navbar from '../components/Navbar';
import Header from '../components/RequestModule/Header';
import axiosClient from '../axios-client';
import RequestDataTable from '../components/RequestModule/RequestDataTable';



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
        <Outlet/>
    </div>
  )
}

export default DefaultLayout
