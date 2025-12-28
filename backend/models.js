const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Tabelul pentru Activități
const Activity = sequelize.define('Activity', {
    nume: { type: DataTypes.STRING, allowNull: false },
    descriere: { type: DataTypes.TEXT },
    codAcces: { type: DataTypes.STRING, unique: true, allowNull: false },
    durata: { type: DataTypes.INTEGER } // în minute
});

// Tabelul pentru Feedback
const Feedback = sequelize.define('Feedback', {
    emoticon: { type: DataTypes.STRING, allowNull: false }, // smiley, frowny, etc.
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

//o activitate are mai multe feedback-uri
Activity.hasMany(Feedback);
Feedback.belongsTo(Activity);

module.exports = { Activity, Feedback, sequelize };