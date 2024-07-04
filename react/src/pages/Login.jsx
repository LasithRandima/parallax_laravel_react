
import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">


            <form onSubmit={onSubmit}>
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="../assets/img/login3.jpg"
                      alt="login form"
                      className="img-fluid imagebox-wrapper"
                      style={{ borderRadius: '1rem 0 0 1rem' }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">


                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                          <span className="h1 fw-bold mb-0">E-Hospital</span>
                        </div>
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="email" id="email" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="email">Email address</label>
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="password" id="pwd" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="pwd">Password</label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="button">Login</button>
                        </div>
                      
                        <p className="mb-3 pb-lg-2" style={{ color: '#393f81' }}>
                          Don't have an account? <Link to="/signup" style={{ color: '#393f81' }}>Register here</Link>
                        </p>

                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </form>


          </div>
        </div>
      </section>
    )
}

export default Login
