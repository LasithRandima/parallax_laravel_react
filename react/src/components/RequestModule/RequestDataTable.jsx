import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosClient from '../../axios-client';

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
        <tr className="table-warning" style={{background:"#C19C27 !important"}}>
          <th scope="col">SL No</th>
          <th scope="col">Created On</th>
          <th scope="col">Location</th>
          <th scope="col">Service</th>
          <th scope="col">Status</th>
          <th scope="col">Department</th>
          <th scope="col">Requested By</th>
          <th scope="col">Assigned To</th>
          <th scope="col">Priority</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentRequests.map((request, index) => (
          <tr key={request.id}>
            <td>{(currentPage - 1) * requestsPerPage + index + 1}</td>
            <td>{request.created_on}</td>
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
              <button 
                className="btn btn-sm btn-light me-2" 
                onClick={() => handleAction('view', request.id)}
              >
                <i className="fas fa-eye"></i>
              </button>
              <button 
                className="btn btn-sm btn-primary me-2" 
                onClick={() => handleAction('edit', request.id)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                className="btn btn-sm btn-danger" 
                onClick={ev => onDeleteClick(request)}
              >
                <i className="fas fa-trash"></i>
              </button>
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
  </div>
  )
}

export default RequestDataTable