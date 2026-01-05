const mongoose = require('mongoose');

// --- Schema pentru Activități ---
const ActivitySchema = new mongoose.Schema({
    nume: { 
        type: String, 
        required: true 
    },
    descriere: { 
        type: String 
    },
    codAcces: { 
        type: String, 
        required: true, 
        unique: true 
    },
    durata: { 
        type: Number 
    }, 
    dataInceput: { 
        type: Date, 
        required: true 
    }
}, { timestamps: true }); 

// --- Schema pentru Feedback ---
const FeedbackSchema = new mongoose.Schema({
    emoticon: { 
        type: String, 
        required: true 
    },

    ActivityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    }
}, { timestamps: true });

// Crearea modelelor
const Activity = mongoose.model('Activity', ActivitySchema);
const Feedback = mongoose.model('Feedback', FeedbackSchema);

// Exportăm modelele 
module.exports = { Activity, Feedback };