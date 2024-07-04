import { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';


const Navbar = () => {
    const {user, token, setUser, setToken} = useStateContext();

    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])

      const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

  return (
    <nav className="navbar navbar-expand-md text-white py-3" style={{ background: '#830823', height: '60px', width: '100%' }}>
      <div className="container" style={{ width: '100vw', paddingLeft: '0px', paddingRight: '0px' }}>
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="text-white" style={{ fontFamily: 'Inter' }}>e-hospital</span>
        </Link>
        <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-3">
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-3" style={{ background: '#830823', width: '100vw' }}>
          <ul className="navbar-nav mx-auto" style={{ background: '#830823' }}>
            <li className="nav-item d-flex justify-content-center align-items-center align-items-lg-center" style={{ marginRight: '12px' }}>
              <i className="fas fa-home" style={{ marginRight: '7px' }}></i>
              <Link className="nav-link active link-light" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item d-flex justify-content-center align-items-center align-items-lg-center" style={{ marginRight: '12px' }}>
              <i className="far fa-list-alt" style={{ marginRight: '7px' }}></i>
              <Link className="nav-link active link-light" to="/dashboard/requests">Requests</Link>
            </li>
            <li className="nav-item d-flex justify-content-center align-items-center align-items-sm-center align-items-lg-center" style={{ marginRight: '12px' }}>
              <i className="far fa-file-alt" style={{ marginRight: '7px' }}></i>
              <Link className="nav-link active link-light" to="/reports">Reports</Link>
            </li>
            <li className="nav-item d-flex justify-content-center align-items-center align-items-lg-center" style={{ marginRight: '12px' }}>
              <i className="far fa-user" style={{ marginRight: '7px' }}></i>
              <Link className="nav-link active link-light" to="/patient">Patient</Link>
            </li>
            <li className="nav-item dropdown d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center">
              <Link className="nav-link link-light d-flex align-items-center justify-content-md-center align-items-md-center" aria-expanded="false" data-bs-toggle="dropdown" to="#">
                <i className="far fa-sun" style={{ marginRight: '7px' }}></i>
                <span>Settings</span>
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">Manage Profile</Link>
                <Link className="dropdown-item" to="#">Security</Link>
                <Link className="dropdown-item" to="#">Visibility</Link>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav d-flex justify-content-center align-items-center flex-nowrap ms-auto" style={{ height: '60px' }}>
            <li className="nav-item d-sm-flex d-md-flex d-lg-flex justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center align-items-lg-center dropdown no-arrow mx-1">
              <div className="nav-item dropdown d-sm-flex justify-content-sm-center align-items-sm-center no-arrow">
                <Link className="link-light d-lg-flex justify-content-lg-center align-items-lg-center nav-link" aria-expanded="false" data-bs-toggle="dropdown" to="#">
                  <i className="far fa-moon fa-fw"></i>
                </Link>
                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">alerts center</h6>
                  <Link className="dropdown-item d-flex align-items-center" to="#">
                    <div className="dropdown-list-image me-3">
                      <img className="rounded-circle" src="../assets/img/avatars/avatar4.jpeg" alt="Avatar" />
                      <div className="bg-success status-indicator"></div>
                    </div>
                    <div className="fw-bold">
                      <div className="text-truncate"><span>Hi there!</span></div>
                      <p className="small text-gray-500 mb-0">{user.name} - 58m</p>
                    </div>
                  </Link>
                  <Link className="dropdown-item text-center small text-gray-500" to="#">Show All Alerts</Link>
                </div>
              </div>
              <div className="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsDropdown"></div>
            </li>
            <li className="nav-item d-sm-flex d-md-flex d-lg-flex justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center align-items-lg-center dropdown no-arrow mx-1">
              <div className="nav-item dropdown no-arrow">
                <Link aria-expanded="false" data-bs-toggle="dropdown" className="nav-link" to="#">
                  <i className="far fa-bell text-light fa-fw"></i>
                </Link>
                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">alerts center</h6>
                  <Link className="dropdown-item d-flex align-items-center" to="#">
                    <div className="me-3">
                      <div className="bg-primary icon-circle"><i className="fas fa-file-alt text-white"></i></div>
                    </div>
                    <div>
                      <span className="small text-gray-500">July 2, 2024</span>
                      <p>A new monthly report is ready to download!</p>
                    </div>
                  </Link>
                  <Link className="dropdown-item text-center small text-gray-500" to="#">Show All Alerts</Link>
                </div>
              </div>
            </li>
            <div className="d-none d-sm-block topbar-divider"></div>
            <li className="nav-item d-sm-flex d-md-flex d-lg-flex justify-content-sm-center align-items-sm-center align-items-md-center align-items-lg-center dropdown no-arrow">
              <div className="nav-item dropdown no-arrow">
                <Link className="d-md-flex d-lg-flex justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center nav-link" aria-expanded="false" data-bs-toggle="dropdown" to="#" style={{ height: '40px' }}>
                  <span className="text-white d-none d-lg-inline me-2 text-gray-600 small" style={{ textAlign: 'right' }}>Welcome<br />{capitalizeFirstLetter(user.name)}</span>
                  <img className="border rounded-circle img-profile" src="../assets/img/avatars/avatar1.jpeg" alt="Avatar" style={{ height: '40px', width: '40px' }} />
                </Link>
                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                  <Link className="dropdown-item" to="#"><i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</Link>
                  <Link className="dropdown-item" to="#"><i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings</Link>
                  <Link className="dropdown-item" to="#"><i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log</Link>
                  <div className="dropdown-divider"></div>
                  {/* <a href="#" onClick={onLogout} className="btn btn-primary">Logout</a> */}
                  <Link onClick={onLogout} className="dropdown-item" to="#"><i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
