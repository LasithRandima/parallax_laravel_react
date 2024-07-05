import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';

const EditModal = ({ requestId, requestData }) => {
    const {user} = useStateContext();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    // Function to transform requestData to match Formik initialValues
    const transformRequestData = (data) => {
        const [floor, room, block] = data.location.match(/^(F\d)(\d+)(.*)/).slice(1); // Extract from location

        return {
        floor: floor || '', 
        room: room || '',
        block: block || '',
        guestName: data.assigned_to || '',
        phoneNumber: data.service || '', 
        service: data.service || '',
        department: data.department || '',
        priority: data.priority || '',
        };
    };

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



    const handleSubmit = async (values, { resetForm }) => {
        
        console.log(values.request);
        console.log(values);
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
          const response = await  axiosClient.patch(`/api/patientrequests/${requestId}`,
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
    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
    <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Request</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">


    <Formik
        initialValues={transformRequestData(requestData)} // Transform data
        validationSchema={RequestSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
  )
}

export default EditModal