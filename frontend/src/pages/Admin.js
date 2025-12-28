import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    // State-uri pentru formularul de creare
    const [nume, setNume] = useState('');
    const [descriere, setDescriere] = useState('');
    const [codAcces, setCodAcces] = useState('');
    const [durata, setDurata] = useState(60);

    // State-uri pentru afișarea rezultatelor
    const [activitati, setActivitati] = useState([]);
    const [feedbackSelectat, setFeedbackSelectat] = useState([]);
    const [idActivitateCurenta, setIdActivitateCurenta] = useState(null);

    // Activitate nouă
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/activities', {
                nume, descriere, codAcces, durata
            });
            alert("Activitate creată cu succes!");
            loadActivities(); // Reîncărcăm lista
        } catch (error) {
            alert("Eroare la creare. Verifică dacă codul e unic!");
        }
    };

    // încarcă toate activitățile
    const loadActivities = async () => {
        const res = await axios.get('http://localhost:5000/activities');
        setActivitati(res.data);
    };

    // încarcă feedback-ul pentru o activitate
    const viewFeedback = async (id) => {
        setIdActivitateCurenta(id);
        const res = await axios.get(`http://localhost:5000/activities/${id}/feedbacks`);
        setFeedbackSelectat(res.data);
    };

    // Încărcăm lista de activități când deschidem pagina
    useEffect(() => {
        loadActivities();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Panou Profesor</h1>

            {/* SECȚIUNEA 1: Formular Creare */}
            <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px' }}>
                <h2>Creează Activitate Nouă</h2>
                <form onSubmit={handleCreate}>
                    <input type="text" placeholder="Nume Curs" onChange={e => setNume(e.target.value)} required />
                    <input type="text" placeholder="Cod Acces" onChange={e => setCodAcces(e.target.value)} required />
                    <input type="number" placeholder="Durata (min)" onChange={e => setDurata(e.target.value)} required />
                    <button type="submit">Creează</button>
                </form>
            </div>

            <hr />

            {/* SECȚIUNEA 2: Listă Activități */}
            <h2>Activitățile tale</h2>
            <ul>
                {activitati.map(act => (
                    <li key={act.id}>
                        <strong>{act.nume}</strong> (Cod: {act.codAcces}) 
                        <button onClick={() => viewFeedback(act.id)} style={{marginLeft: '10px'}}>Vezi Feedback</button>
                    </li>
                ))}
            </ul>

            {/* SECȚIUNEA 3: Dashboard Feedback */}
            {idActivitateCurenta && (
                <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc' }}>
                    <h3>Feedback pentru activitatea #{idActivitateCurenta}</h3>
                    <button onClick={() => viewFeedback(idActivitateCurenta)}>🔄 Refresh Date</button>
                    
                    <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                        <p>😊 Multumit: {feedbackSelectat.filter(f => f.emoticon === 'smiley').length}</p>
                        <p>☹️ Nemulțumit: {feedbackSelectat.filter(f => f.emoticon === 'frowny').length}</p>
                        <p>😲 Surprins: {feedbackSelectat.filter(f => f.emoticon === 'surprised').length}</p>
                        <p>😕 Confuz: {feedbackSelectat.filter(f => f.emoticon === 'confused').length}</p>
                    </div>

                    <h4>Istoric detaliat (momente de timp):</h4>
                    <div style={{ maxHeight: '200px', overflowY: 'scroll', background: '#eee', padding: '10px' }}>
                        {feedbackSelectat.map(f => (
                            <div key={f.id}>
                                [{new Date(f.createdAt).toLocaleTimeString()}] - {f.emoticon}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;