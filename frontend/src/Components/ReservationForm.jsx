import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const ReservationForm = () => {

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        date:"",
        time:"",
        guests:"1"
    })

    const handleChanges = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(backendUrl + '/api/reservations/create' , formData)
            toast.success('Reservation was successful, see you soon!')

            setFormData({ name: "", email: "", phone:"", date: "", time: "", guests: "1"})
        } catch (error) {
            console.log("There was an error making a reservation.");
        }
    }

    const generateTimeSlots = () => {
        const timeSlots = [];
        for (let hour = 7; hour < 19; hour++){
             const startHour = hour % 12 === 0 ? 12 : hour % 12;
             const startPeriod = hour < 12 ? "AM" :"PM"

             const endHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1)% 12;
             const endPeriod = hour + 1 < 12 ? "AM" : "PM"

             timeSlots.push(`${startHour}:00 ${startPeriod} - ${endHour}:00 ${endPeriod}`)
        }
        return timeSlots;
    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-blue-200'>
        <form onSubmit={handleSubmit} className='bg-pink-100 p-8 rounded-xl shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Lets Boook a Reservation</h2>
            <input name="name" value={formData.name} onChange={handleChanges} type="text" placeholder="Full Name" className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-600' required/>
            <input name="email" value={formData.email} onChange={handleChanges} type="email" placeholder='Email' className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-600' required/>
            <input name="phone" value={formData.phone} onChange={handleChanges} type="tel" placeholder='Phone Number' className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-600' required/>
            <input name="date" value={formData.date} onChange={handleChanges} type="date" className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-600' required />

            <select name="time" value={formData.time}
            onChange={handleChanges}
             className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-600' 
            required>
                <option value="">Select Time</option>
                {
                    generateTimeSlots().map((slot, index)=> (
                        <option key={index} value={slot}>{slot}</option>
                    ))
                }
            </select>

            <select name="guests" value={formData.guests}
            onChange={handleChanges}
             className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-600' 
            required>
                {[...Array(50).keys().map(i => (
                    <option key={i + 10} value={i + 10}>{i + 10}-Guests</option>
                ))]}
            </select>
            <button type='submit' className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-pink-100 hover:text-gray-700 transition cursor-pointer'>Reserve Now</button>
        </form>
    </div>
  )
}

export default ReservationForm