import { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useStateContext } from '../../contexts/ContextProvider';

const RequestDataTable = () => {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        department: '',
        fromDate: '',
        toDate: ''
      });
  
    useEffect(() => {
      getAllRequests();

    }, [filters]);

    const getAllRequests = () => {
        setLoading(true)
        axiosClient.get('/patientrequests')
          .then(({ data }) => {
            setLoading(false)
            setRequests(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
      }

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

    const {user, token} = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    const handleEditClick = () => {

    }

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
          const response = await  axiosClient.patch('/patientrequests',
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


    const onDeleteClick = user => {
        if (!window.confirm("Are you sure you want to delete this Request?")) {
          return
        }
        axiosClient.delete(`/patientrequests/${user.id}`)
          .then(() => {
            getAllRequests();
          })
      }

    // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value, 
    });
  };
  
    // Pagination logic
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    // Function to handle CRUD operations (placeholder)
    const handleAction = (action, requestId) => {
      console.log(`Performing ${action} on request ID: ${requestId}`);
      // Implement your CRUD logic here (e.g., open modals, make API calls)
    };
  return (
    <div className='container-fluid'>
<div className="row g-2 my-3 d-flex justify-between">
        {/* Search Bar */}
        <div className="col-12 col-md-3">
          <div className="input-group" style={{ width: '100%' }}>
            <span className="input-group-text" style={{ backgroundColor: '#fff', borderRight: 'none' }}>
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by..."
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              style={{ borderLeft: 'none' }}
            />
          </div>
        </div>

        {/* Date Range Filters */}
        <div className="col-12 col-md-2">
          <input
            type="date"
            className="form-control"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-12 col-md-2">
          <input
            type="date"
            className="form-control"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
          />
        </div>

        {/* Status Dropdown */}
        <div className="col-12 col-md-auto">
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Status <i className="fas fa-chevron-down ms-2"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  All Statuses
                </a>
              </li>
            
            </ul>
          </div>
        </div>

        {/* Department Dropdown */}
        <div className="col-12 col-md-auto">
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Department <i className="fas fa-chevron-down ms-2"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  All Departments
                </a>
              </li>
            
            </ul>
          </div>
        </div>

        {/* Filter and Download Buttons */}
        <div className="col-12 col-md-2 d-flex justify-content-end align-items-end">
          <button type="button" className="btn btn-dark me-2">
            <i className="fas fa-filter"></i>
          </button>
          <button type="button" className="btn btn-dark">
            <i className="fas fa-download"></i>
          </button>
        </div>
      </div>


      {/* Table */}
      <div className="tablewrapper table-responsive">
    <table className="table table-sm">
    <thead>
            <tr className="table-header-custom"> 
              <th scope="col" className="text-end">SL No</th>
              <th scope="col">Created On<i className="fas fa-stream fa-xs ms-1"></i></th>
              <th scope="col">Location</th>
              <th scope="col">Service</th>
              <th scope="col">Status<i className="fas fa-stream fa-xs ms-1"></i></th>
              <th scope="col">Department</th>
              <th scope="col">Requested By</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Priority</th>
              <th scope="col"></th> 
            </tr>
      </thead>
      <tbody>
        {currentRequests.map((request, index) => (
          <tr key={request.id}>
            <td>{(currentPage - 1) * requestsPerPage + index + 1}</td>
            <td>
            {new Date(request.created_on).toLocaleDateString('en-GB', {
              day: '2-digit', 
              month: '2-digit',
              year: '2-digit',
            })}
            </td>
            <td>{request.location}</td>
            <td>{request.service}</td>
            <td>
              <span
                className={`badge 
                  ${request.status === 'NEW' ? 'bg-info text-dark' : ''} 
                  ${request.status === 'IN_PROGRESS' ? 'bg-success text-white' : ''}
                  ${request.status === 'COMPLETED' ? 'bg-primary text-white' : ''}
                  ${request.status === 'ON_HOLD' ? 'bg-secondary text-white' : ''}
                  ${request.status === 'CANCELLED' ? 'bg-warning text-white' : ''}
                  ${request.status === 'REJECTED' ? 'bg-danger text-white' : ''}
                `}
              >
                {request.status}
              </span>
            </td>
            <td>{request.department}</td>
            <td>{request.requested_by}</td>
            <td>{request.assigned_to}</td>
            <td>
              <span
                className={`badge 
                  ${request.priority === 'HIGH' ? 'bg-danger text-white' : ''} 
                  ${request.priority === 'MEDIUM' ? 'bg-warning text-dark' : ''}
                  ${request.priority === 'LOW' ? 'bg-success text-white' : ''}
                `}
              >
                {request.priority}
              </span>
            </td>
            <td>
                <div className="inline-flex">
                <button 
                className="btn btn-light me-1 btn-xs py-0 px-1" 
                onClick={() => handleAction('view', request.id)}
              >
                <i className="fas fa-eye my-0 mx-0"></i>
              </button>
         
              <button
                type="button" 
                className="btn btn-primary btn-xs me-1 py-0 px-1" 
                data-bs-toggle="modal" data-bs-target="#editModal"
                onClick={() => handleEditClick(request)} 
              >
                <i className="fas fa-edit my-0 mx-0"></i>
              </button>
              <button 
                className="btn btn-danger btn-sx py-0 px-1" 
                onClick={ev => onDeleteClick(request)}
              >
                <i className="fas fa-trash my-0 mx-0"></i>
              </button>
                </div>
             
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Pagination */}
    <div className="d-flex justify-content-center align-content-center">
    <nav>
      <ul className="pagination">
        {Array(Math.ceil(requests.length / requestsPerPage))
          .fill()
          .map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </nav>
    </div>
    </div>

            {/* Modal Form */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Request</h1>
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

        {/* End of Edit Modal */}
  </div>
  )
}

export default RequestDataTable