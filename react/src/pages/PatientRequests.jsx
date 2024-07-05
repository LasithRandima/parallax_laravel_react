import React, { useState } from 'react'
import Header from '../components/RequestModule/Header'
import RequestDataTable from '../components/RequestModule/RequestDataTable'
import axiosClient from '../axios-client';

const PatientRequests = () => {


  return (
    <div>
        <RequestDataTable/>
    </div>
  )
}

export default PatientRequests