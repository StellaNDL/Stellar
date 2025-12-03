import React from 'react'
import AdminTable from './Components/AdminTable'
import {ToastContainer, toast} from 'react-toastify'

export const backendUrl ="https://stellar-backend2.onrender.com";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <AdminTable />
    </div>
  )
}

export default App
