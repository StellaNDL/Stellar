import Reservation from '../models/reservation.js'

const createReservation = async (req,res) => {
    try {
        const {name, email, phone, date, time, guests} = req.body 
        if (!name || !email || !phone || !date || !time || !guests){
            return res.json({error: 'Fill in all the fields!'})
        }

        const newReservation = new Reservation({name, email, phone, date, time, guests})
        await newReservation.save()

        res.json({message: "You have reserved your spot. See you soon!", reservation: newReservation})
    } catch (error) {
        res.json({error: "There was an error while creating your reservation."})
    }
}

const getAllReservation = async (req,res) => {
    try {
        const reservations = await Reservation.find()
        res.json(reservations)
    } catch (error) {
        res.json({error: "There was an error fetching reservations."})
    }
  
}

const deleteReservation = async (req,res) => {
    try {
        const { id }= req.params;
        await Reservation.findByIdAndDelete(id);
        res.json({success:true, message: 'Reservation deleted!'})
    } catch (error) {
        res.json({success:false, error: 'There was an error while deleting the reservation.'})
    }
}

export {createReservation, getAllReservation, deleteReservation}