
import { createRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

const Login = () => {
    const emailRef = createRef();
    const passwordRef = createRef();
    const navigate = useNavigate();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        console.log(payload);

        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                navigate('/dashboard'); // Redirect to dashboard or desired page after successful login
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    // setErrors(response.data.errors);
                    setMessage(response.data.message);
                }
            });
    };


    return (
        <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
        <div className="container py-2 h-100">
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
                                            {message &&
                                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                                <p>{message}</p>
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>
                                            }
                                            {errors && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                {Object.keys(errors).map(key => (
                                                    <p key={key}>{errors[key][0]}</p>
                                                ))}
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>
                                            }
                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input ref={emailRef} type="email" id="email" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="email">Email address</label>
                                            </div>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input ref={passwordRef} type="password" id="pwd" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="pwd">Password</label>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block" type='submit'>Login</button>
                                            </div>
                                            <p className="mb-3 pb-lg-2" style={{ color: '#393f81' }}>
                                                Don&apos;t have an account? <Link to="/signup" style={{ color: '#393f81' }}>Register here</Link>
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
