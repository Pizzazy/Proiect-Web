import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [nume, setNume] = useState('');
    const [descriere, setDescriere] = useState('');
    const [codAcces, setCodAcces] = useState('');
    const [durata, setDurata] = useState(60);
    const [dataInceput, setDataInceput] = useState('');

    const [activitati, setActivitati] = useState([]);
    const [feedbackSelectat, setFeedbackSelectat] = useState([]);
    const [idActivitateCurenta, setIdActivitateCurenta] = useState(null);

    const loadActivities = async () => {
        try {
            const res = await axios.get('http://localhost:5000/activities');
            setActivitati(res.data);
        } catch (error) {
            console.error('Nu am putut incarca activitatile');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/activities', {
                nume,
                descriere,
                codAcces,
                durata,
                dataInceput,
            });
            alert('Activitate creată!');
            loadActivities();
        } catch (error) {
            alert('Eroare: Codul de acces trebuie să fie unic!');
        }
    };

    const viewFeedback = async (id) => {
        setIdActivitateCurenta(id);
        try {
            const res = await axios.get(`http://localhost:5000/activities/${id}/feedbacks`);
            setFeedbackSelectat(res.data);
        } catch (error) {
            console.error('Eroare la incarcarea feedback-ului');
        }
    };

    useEffect(() => {
        loadActivities();
    }, []);

    const getStatus = (start, duration) => {
        const acum = new Date();
        const inceput = new Date(start);
        const sfarsit = new Date(inceput.getTime() + duration * 60000);

        if (acum < inceput) return { text: 'Urmeaza', color: 'orange' };
        if (acum > sfarsit) return { text: 'Incheiata', color: 'red' };
        return { text: 'ACTIVA ACUM', color: 'green' };
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
            <h2>Panel Profesor - Gestiune Activitati</h2>

            {/* FORMULAR CREARE */}
            <form
                onSubmit={handleCreate}
                style={{ display: 'grid', gap: '10px', background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}
            >
                <input type="text" placeholder="Nume Seminar" onChange={(e) => setNume(e.target.value)} required />
                <textarea placeholder="Descriere" onChange={(e) => setDescriere(e.target.value)} />
                <input type="text" placeholder="Cod Unic (ex: LAB1)" onChange={(e) => setCodAcces(e.target.value)} required />
                <input type="number" placeholder="Durata (minute)" onChange={(e) => setDurata(e.target.value)} required />
                <div style={{ margin: '10px 0' }}>
                    <label>Data si ora de inceput: </label>
                    <input type="datetime-local" onChange={(e) => setDataInceput(e.target.value)} required />
                </div>
                <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Creeaza Activitate
                </button>
            </form>

            <hr />

            {/* LISTA ACTIVITATI */}
            <h3>Activitati Existente</h3>
            <ul>
                {activitati.map((act) => (
                    <li key={act.id} style={{ marginBottom: '10px' }}>
                        <strong>{act.nume}</strong> (Cod: {act.codAcces})
                        <br />
                        <small>
                            Incepe pe: {new Date(act.dataInceput).toLocaleDateString('ro-RO')} la ora{' '}
                            {new Date(act.dataInceput).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            <br />
                            Durata: {act.durata} minute
                        </small>
                        <br />
                        <button onClick={() => viewFeedback(act.id)} style={{ marginTop: '5px' }}>
                            Vezi Feedback
                        </button>
                    </li>
                ))}
            </ul>

            {/* DASHBOARD FEEDBACK */}
            {idActivitateCurenta && (
                <div style={{ marginTop: '30px', padding: '20px', border: '2px solid #007bff', borderRadius: '10px' }}>
                    <h3>Rezultate Feedback (ID: {idActivitateCurenta})</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '1.8rem', marginBottom: '20px' }}>
                        <div>😊 {feedbackSelectat.filter((f) => f.emoticon === 'smiley').length}</div>
                        <div>☹️ {feedbackSelectat.filter((f) => f.emoticon === 'frowny').length}</div>
                        <div>😲 {feedbackSelectat.filter((f) => f.emoticon === 'surprised').length}</div>
                        <div>😕 {feedbackSelectat.filter((f) => f.emoticon === 'confused').length}</div>
                    </div>

                    <h4>Istoric reactii live:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxHeight: '200px', overflowY: 'auto', padding: '10px', background: '#f9f9f9' }}>
                        {feedbackSelectat.length > 0 ? (
                            [...feedbackSelectat]
                                .reverse()
                                .map((f, index) => (
                                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '5px', borderRadius: '5px', minWidth: '45px', border: '1px solid #ddd' }}>
                                        <span style={{ fontSize: '1.4rem' }}>
                                            {f.emoticon === 'smiley' && '😊'}
                                            {f.emoticon === 'frowny' && '☹️'}
                                            {f.emoticon === 'surprised' && '😲'}
                                            {f.emoticon === 'confused' && '😕'}
                                        </span>
                                        <small style={{ fontSize: '0.65rem', color: '#666' }}>
                                            {f.createdAt ? new Date(f.createdAt).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                        </small>
                                    </div>
                                ))
                        ) : (
                            <p>Nicio reactie.</p>
                        )}
                    </div>
                    <button onClick={() => viewFeedback(idActivitateCurenta)} style={{ marginTop: '15px' }}>Actualizeaza Date</button>
                </div>
            )}
        </div>
    );
};

export default Admin;