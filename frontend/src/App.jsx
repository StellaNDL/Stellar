import React from 'react'
import ReservationForm from './Components/ReservationForm'
import { ToastContainer } from 'react-toastify'

export const backendUrl ='http://localhost:4000'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <ReservationForm/>
    </div>
  )
}

export default App