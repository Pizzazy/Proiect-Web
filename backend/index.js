const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000; 

sequelize.sync({ force: false }).then(() => {
    console.log("Baza de date este gata!");
    app.listen(PORT, () => {
        console.log(`Serverul rulează pe portul ${PORT}`);
    });
});