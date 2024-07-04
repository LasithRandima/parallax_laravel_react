import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Notfound from './pages/Notfound'
import DefaultLayout from './layouts/DefaultLayout'
import GuestLayout from './layouts/GuestLayout'
import PatientRequests from './pages/PatientRequests'

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard/requests"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/dashboard/requests',
                element: <PatientRequests/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },

    {
        path: '*',
        element: <Notfound/>
    }
])


export default router
