import { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';

const ReadModal = ({ requestId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (requestId) {
      getSingleRequest();
    }
  }, [requestId]);

  const getSingleRequest = () => {
    setIsLoading(true);
    axiosClient.get(`/patientrequests/${requestId}`)
      .then(({ data }) => {
        setIsLoading(false);
        setRequest(data.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="modal fade" id="readModal" tabIndex="-1" aria-labelledby="readModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Request Details</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : request ? (
              <div>
                <div className="mb-3">
                  <h6 className="fw-bold">Request ID:</h6>
                  <p>{request.id}</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">Created On:</h6>
                  <p>{request.created_on}</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">Location:</h6>
                  <p>{request.location}</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">Service:</h6>
                  <p>{request.service}</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">Status:</h6>
                  <p>{request.status}</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">Priority:</h6>
                  <p>{request.priority}</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">Department:</h6>
                  <p>{request.department}</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">Requested By:</h6>
                  <p>{request.requested_by}</p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">Assigned To:</h6>
                  <p>{request.assigned_to}</p>
                </div>
              </div>
            ) : (
              <p>No request details available.</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadModal;
