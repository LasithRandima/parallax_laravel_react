import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';



const RequestSchema = Yup.object().shape({
    floor: Yup.string().required('Required'),
    room: Yup.string().required('Required'),
    block: Yup.string().required('Required'),
    guestName: Yup.string().required('Required'),
    phoneNumber: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be at least 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    service: Yup.string().required('Required'),
    department: Yup.string().required('Required'),
    priority: Yup.string().required('Required'),
  });

const Header = () => {
    const {user, token} = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    const handleSubmit = async (values, { resetForm }) => {
        setIsLoading(true);
        setServerError(null);
        setSuccessMessage(null);

        const formatDate = (date) => {
            const d = new Date(date);
            let month = '' + (d.getMonth() + 1);
            let day = '' + d.getDate();
            const year = d.getFullYear();
      
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
      
            return [year, month, day].join('-');
          };
      

        const payload = {
            created_on: formatDate(new Date()),
            location: `${values.floor}${values.room}${values.block}`,
            service: values.service,
            status: 'NEW', // default status
            priority: values.priority,
            department: values.department,
            requested_by: user.name, // use current logged user name
            assigned_to: values.guestName,
          };

        console.log(payload);

    
        try {
          const response = await  axiosClient.post('/patientrequests',
            payload
          );
          console.log('Request created:', response.data);
          setSuccessMessage('Request submitted successfully!');
          resetForm();
        } catch (error) {
          console.error('Error creating request:', error);
          if (error.response) {
            setServerError(
              error.response.data.message || 'Failed to submit request'
            );
          } else if (error.request) {
            setServerError('No response from server');
          } else {
            setServerError('Failed to create request');
          }
        } finally {
          setIsLoading(false);
        }
      };


  return (
          <header style={{ background: '#ffffff', minHeight: 'auto' }}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 align-items-lg-center my-auto requestbox">
              <span className="fs-2 d-flex align-items-center justify-content-between justify-content-lg-start" style={{ fontFamily: 'Inter' }}>
                <div><strong>Requests</strong></div>
                <div>
                  {/* <button className="btn btn-primary" type="button" style={{ marginLeft: '26px', background: 'rgb(154,22,13)' }}>
                    <strong>+ New Request</strong>
                  </button> */}
                  <button className="btn btn-danger" type="button" style={{ marginLeft: '26px', background: 'rgb(154,22,13)' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <strong>+ New Request</strong>
                  </button>
                </div>
              </span>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
              <div className="row gy-4 row-cols-2 row-cols-md-4">
                <div className="col" style={{ height: '172px' }}>
                  <div className="text-center d-flex flex-column justify-content-center align-items-center py-3" style={{ height: '172px' }}>
                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary text-dark d-flex flex-column flex-shrink-0 justify-content-between align-items-center d-inline-block mb-2 bs-icon lg" style={{ background: '#ffe2e8', height: '114px', width: '114px' }}>
                      <span style={{ fontSize: '40px', marginTop: '28px', lineHeight: '30px' }}><strong>10</strong></span>
                      <p style={{ fontSize: '14px', lineHeight: '15px', marginTop: '0px', marginBottom: '17px' }}>New<br />Requests</p>
                    </div>
                    <div className="px-3"></div>
                  </div>
                </div>
                <div className="col" style={{ height: '172px' }}>
                  <div className="text-center d-flex flex-column justify-content-center align-items-center py-3" style={{ height: '172px' }}>
                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary text-dark d-flex flex-column flex-shrink-0 justify-content-between align-items-center d-inline-block mb-2 bs-icon lg" style={{ background: '#CCF5BB', height: '114px', width: '114px' }}>
                      <span style={{ fontSize: '40px', marginTop: '28px', lineHeight: '30px' }}><strong>05</strong></span>
                      <p style={{ fontSize: '14px', lineHeight: '15px', marginTop: '0px', marginBottom: '17px' }}>Delayed<br />Requests</p>
                    </div>
                    <div className="px-3"></div>
                  </div>
                </div>
                <div className="col" style={{ height: '172px' }}>
                  <div className="text-center d-flex flex-column justify-content-center align-items-center py-3" style={{ height: '172px' }}>
                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary text-dark d-flex flex-column flex-shrink-0 justify-content-between align-items-center d-inline-block mb-2 bs-icon lg" style={{ background: '#D0EEFF', height: '114px', width: '114px' }}>
                      <span style={{ fontSize: '40px', marginTop: '28px', lineHeight: '30px' }}><strong>02</strong></span>
                      <p style={{ fontSize: '14px', lineHeight: '15px', marginTop: '0px', marginBottom: '17px' }}>Escalated<br />Requests</p>
                    </div>
                    <div className="px-3"></div>
                  </div>
                </div>
                <div className="col" style={{ height: '172px' }}>
                  <div className="text-center d-flex flex-column justify-content-center align-items-center py-3" style={{ height: '172px' }}>
                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary text-dark d-flex flex-column flex-shrink-0 justify-content-between align-items-center d-inline-block mb-2 bs-icon lg" style={{ background: '#D2D4FF', height: '114px', width: '114px', marginRight: '0px' }}>
                      <span style={{ fontSize: '40px', marginTop: '28px', lineHeight: '30px' }}><strong>00</strong></span>
                      <p style={{ fontSize: '14px', lineHeight: '15px', marginTop: '0px', marginBottom: '17px' }}>On Hold<br />Requests</p>
                    </div>
                    <div className="px-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Modal Form */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Create New Request</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


            <Formik
            initialValues={{
              floor: '',
              room: '',
              block: '',
              guestName: '',
              phoneNumber: '',
              service: '',
              department: '',
              priority: '',
            }}
            validationSchema={RequestSchema}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
              <Form>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="floor" className="form-label">Floor *</label>
                      <Field as="select" className="form-select" id="floor" name="floor">
                        <option value="">Select Floor</option>
                        <option value="F1">Floor 1</option>
                        <option value="F2">Floor 2</option>
                        <option value="F3">Floor 3</option>
                      </Field>
                      <ErrorMessage name="floor" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="room" className="form-label">Room / Unit *</label>
                      <Field as="select" className="form-select" id="room" name="room">
                        <option value="">Select Room / Unit</option>
                        <option value="101">101</option>
                        <option value="102">102</option>
                        <option value="103">103</option>
                        <option value="104">104</option>
                      </Field>
                      <ErrorMessage name="room" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="block" className="form-label">Block *</label>
                    <Field as="select" className="form-select" id="block" name="block">
                      <option value="">Select Block</option>
                      <option value="Bed">Bed</option>
                      <option value="Washroom">Washroom</option>
                      <option value="Ward-A">Ward A</option>
                      <option value="Ward-B">Ward B</option>
                      <option value="Ward-C">Ward C</option>
                    </Field>
                    <ErrorMessage name="block" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="guestName" className="form-label">Guest Name</label>
                    <Field type="text" className="form-control" id="guestName" name="guestName" />
                    <ErrorMessage name="guestName" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <Field type="text" className="form-control" id="phoneNumber" name="phoneNumber" />
                    <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="service" className="form-label">Service</label>
                    <Field as="select" className="form-select" id="service" name="service">
                      <option value="">Select Service</option>
                      <option value="Housekeeping">Housekeeping</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Security">Security</option>
                      <option value="Call me">Call me</option>

                    </Field>
                    <ErrorMessage name="service" component="div" className="text-danger" />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="department" className="form-label">Department</label>
                      <Field as="select" className="form-select" id="department" name="department">
                        <option value="">Select Department</option>
                        <option value="Patient Experience">Patient Experience</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Ambulance">Ambulance</option>
                        <option value="Nursing">Nursing</option>
                        <option value="Medicines">Medicines</option>
                      </Field>
                      <ErrorMessage name="department" component="div" className="text-danger" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="priority" className="form-label">Priority</label>
                      <Field as="select" className="form-select" id="priority" name="priority">
                        <option value="">Select Priority</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                      </Field>
                      <ErrorMessage name="priority" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="uploadFile" className="form-label">Upload File</label>
                    <input className="form-control" type="file" id="uploadFile" />
                  </div>

                  {serverError && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {serverError}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  )}
                  {successMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      {successMessage}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  )}


                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary text-danger" data-bs-dismiss="modal" style={{ marginLeft: '26px', background: 'rgba(131, 8, 35, 0.08)', color: '#830823'}}>Cancel</button>
                <button type="submit" className="btn btn-danger" style={{ marginLeft: '26px', background: 'rgba(154,22,13)' }}  disabled={isSubmitting || isLoading}  >{isLoading ? 'Submitting...' : 'Submit'}</button>
                </div>
              </Form>
            )}
          </Formik>



            
            </div>
        </div>
        </div>
        </div>


      </header>
  )
}

export default Header