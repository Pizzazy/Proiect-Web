const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const { sequelize, Activity, Feedback } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000; 


// 1. CREARE ACTIVITATE 
app.post('/activities', async (req, res) => {
    try {
        const { nume, descriere, codAcces, durata } = req.body;
        const nouaActivitate = await Activity.create({ nume, descriere, codAcces, durata });
        res.status(201).json(nouaActivitate);
    } catch (error) {
        res.status(500).json({ message: "Eroare la creare", error: error.message });
    }
});

// 2. VEZI TOATE ACTIVITĂȚILE
app.get('/activities', async (req, res) => {
    try {
        const activitati = await Activity.findAll();
        res.json(activitati);
    } catch (error) {
        res.status(500).json({ message: "Eroare la preluare" });
    }
});

// 3. CAUTĂ DUPĂ COD 
app.get('/activities/:cod', async (req, res) => {
    try {
        const codCautat = req.params.cod;
        const activitate = await Activity.findOne({ where: { codAcces: codCautat } });

        if (activitate) {
            res.json(activitate);
        } else {
            res.status(404).json({ message: "Activitatea nu a fost gasita!" });
        }
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
        res.status(500).json({ message: "Eroare la feedback" });
    }
});

// 5. VEZI FEEDBACK PENTRU O ACTIVITATE 
app.get('/activities/:id/feedbacks', async (req, res) => {
    try {
        const feedbackuri = await Feedback.findAll({ where: { ActivityId: req.params.id } });
        res.json(feedbackuri);
    } catch (error) {
        res.status(500).json({ message: "Eroare la preluare feedback" });
    }
});

// PORNIRE SERVER
sequelize.sync({ force: false }).then(() => {
    console.log("Baza de date este gata!");
    app.listen(PORT, () => {
        console.log(`Serverul rulează pe portul ${PORT}`);
    });
});