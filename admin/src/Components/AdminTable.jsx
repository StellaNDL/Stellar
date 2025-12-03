import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminTable = () => {

    const [reservations, setReservations] = useState([])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/api/reservations/delete/${id}`)
            toast.success('Reservation deleted successfully!')
            setReservations(prev => prev.filter(res => res._id !== id))
        } catch (error) {
            console.log('Error deleting reservation.')
        }
    }

    useEffect(()=> {
        const fetchReservation = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/reservations/get')
                setReservations(response.data)
                console.log(response);
            } catch (error) {
                console.log("Error fetching reservations data.");
            }
        }

        fetchReservation()
    },[])

  return (
    <div className='min-h-screen bg-amber-100 p-6'>
        <h2 className='text-3xl font-bold text-black text-center mb-6'>Admin Panel for Reservations</h2>
        <div className='overflow-x-auto'>
        <table className='w-full bg-gray-400 shadow-lg rounded-xl'>
            <thead>
                <tr className='bg-blue-300 text-white text-left'>
                    <th className=''>Name</th>
                    <th className='p-3'>Email</th>
                    <th className='p-3'>Phone</th>
                    <th className='p-3'>Date</th>
                    <th className='p-3'>Time</th>
                    <th className='p-3'>Guests</th>
                    <th className='p-3'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    reservations.length === 0 ? (
                        <tr>
                            <td colSpan='7' className='p-4 text-center text-gray-500'>No reservation found</td>
                        </tr>
                    ) : (
                        reservations.map((res, index) =>(
                            <tr key={index} className=' hover:bg-gray-50'>
                                <td className='p-3'>{res.name}</td>
                                <td className='p-3'>{res.email}</td>
                                <td className='p-3'>{res.phone}</td>
                                <td className='p-3'>{res.date}</td>
                                <td className='p-3'>{res.time}</td>
                                <td className='p-3'>{res.guests}</td>
                                <td className='p-3'>
                                    <button 
                                    onClick={()=> handleDelete(res._id)}
                                    className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red transition cursor-pointer'>Delete</button>
                                </td>
                            </tr>
                        ))
                    )
                }

            </tbody>
        </table>
        </div>
    </div>
  )
}

export default AdminTable
