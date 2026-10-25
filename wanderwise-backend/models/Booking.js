const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookingId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    userName: { 
        type: String, 
        required: true 
    },
    packageName: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    paymentStatus: { 
        type: String, 
        default: 'Pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
