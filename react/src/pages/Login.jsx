
import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();


    return (
        <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
            axios.post('/login', values).then(response => {
                setSubmitting(false);
                navigate('/dashboard');
            }).catch(error => {
                setSubmitting(false);
                console.error(error);
            });
        }}
    >
        {({ isSubmitting }) => (
            <Form>
                <Field type="email" name="email" placeholder="Email" />
                <Field type="password" name="password" placeholder="Password" />
                <button type="submit" disabled={isSubmitting}>Login</button>
            </Form>
        )}
    </Formik>
    )
}

export default Login
