import { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useStateContext } from '../../contexts/ContextProvider';
import EditModal from './EditModal';
import ReadModal from './ReadModal';
import Header from './Header';

const RequestDataTable = () => {
    const [editingRequest, setEditingRequest] = useState(null);
    const [editRequest, setEditRequest] = useState(null);
    const [readRequest, setReadRequest] = useState(null);
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
      if (editRequest) {
        setEditingRequest(editRequest);
        console.log('Editing request:', editingRequest);
      }

    }, [filters, editRequest]);

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





    const handleEditClick = (request) => {
        console.log(request)
        setEditRequest(request);
        console.log(editRequest);
    };

    const handleEditModalClose = () => {
        setEditingRequest(null);
      };

    const handleReadAction = (id) => {
        console.log(id)
        setReadRequest(id);
        console.log(readRequest);
    }



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
  
  return (
    <>
        <Header onUpdate={getAllRequests} />
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
                type="button" 
                className="btn btn-light me-1 btn-xs py-0 px-1"
                data-bs-toggle="modal" data-bs-target="#readModal" 
                onClick={() => handleReadAction(request.id)}
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

        {/* Edit Modal Component  */}
           {editingRequest && (
                <EditModal
                requestId={editingRequest.id}
                requestData={editingRequest} 
                onClose={handleEditModalClose} 
                onUpdate={getAllRequests}
                />
            )}
        {/* End of Edit Modal */}

                  {/* Read Modal Component  */}
           {readRequest && (
                <ReadModal
                requestId={readRequest}
                />
            )}
        {/* End of Edit Modal */}
  </div>
    </>
   
  )
}

export default RequestDataTable