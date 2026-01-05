require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 1. IMPORTĂM MODELELE 
const { Activity, Feedback } = require('./models'); 

const app = express();
app.use(express.json());
app.use(cors());

// Conectarea la MongoDB Atlas
const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
    .then(() => console.log("Conectat cu succes la MongoDB Atlas!"))
    .catch(err => console.error("Eroare la conexiunea DB:", err));



// 1. CREARE ACTIVITATE 
app.post('/activities', async (req, res) => {
    try {
        const { nume, descriere, codAcces, durata, dataInceput } = req.body;
        const nouaActivitate = await Activity.create({ nume, descriere, codAcces, durata, dataInceput });
        res.status(201).json(nouaActivitate);
    } catch (error) {
        res.status(500).json({ message: "Eroare la creare", error: error.message });
    }
});

// 2. VEZI TOATE ACTIVITĂȚILE
app.get('/activities', async (req, res) => {
    try {
        const activitati = await Activity.find(); 
        res.json(activitati);
    } catch (error) {
        res.status(500).json({ message: "Eroare la preluare activitati", error: error.message });
    }
});

// 3. CAUTĂ DUPĂ COD 
app.get('/activities/:cod', async (req, res) => {
    try {
        const codCautat = req.params.cod;
        const activitate = await Activity.findOne({ codAcces: codCautat });

        if (!activitate) {
            return res.status(404).json({ message: "Cod gresit!" });
        }

        const acum = new Date();
        const inceput = new Date(activitate.dataInceput);
        const sfarsit = new Date(inceput.getTime() + activitate.durata * 60000);

        if (acum < inceput) {
            return res.status(403).json({ 
                message: `Activitatea va începe la ${inceput.toLocaleDateString('ro-RO')} ${inceput.toLocaleTimeString('ro-RO')}` 
            });
        }

        if (acum > sfarsit) {
            return res.status(403).json({ message: "Activitatea s-a încheiat deja!" });
        }

        res.json(activitate);
    } catch (error) {
        res.status(500).json({ message: "Eroare la cautare", error: error.message });
    }
});

// 4. TRIMITE FEEDBACK 
app.post('/feedbacks', async (req, res) => {
    try {
        const { emoticon, ActivityId } = req.body;
        const nouFeedback = await Feedback.create({ emoticon, ActivityId });
        res.status(201).json(nouFeedback);
    } catch (error) {
        res.status(500).json({ message: "Eroare la feedback", error: error.message });
    }
});

// 5. VEZI FEEDBACK PENTRU O ACTIVITATE 
app.get('/activities/:id/feedbacks', async (req, res) => {
    try {
        const feedbackuri = await Feedback.find({ ActivityId: req.params.id });
        res.json(feedbackuri);
    } catch (error) {
        res.status(500).json({ message: "Eroare la preluare feedback", error: error.message });
    }
});

// PORNIRE SERVER 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
    console.log(`Accesibil la: http://localhost:${PORT}`);
});