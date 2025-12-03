import React from 'react'
import ReservationForm from './Components/ReservationForm'
import { ToastContainer } from 'react-toastify'

export const backendUrl ="https://stellar-backend2.onrender.com"

const App = () => {
  return (
    <div>
      <ToastContainer />
      <ReservationForm/>
    </div>
  )
}

export default App
