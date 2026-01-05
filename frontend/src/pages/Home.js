import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [code, setCode] = useState(''); 
    const navigate = useNavigate();


    const API_URL = "https://proiect-feedback-continuu-c2b9.onrender.com";

    const handleJoin = async () => {
        try {

            const response = await axios.get(`${API_URL}/activities/${code}`);

            navigate(`/feedback/${response.data._id}`);
            
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert("Eroare la conectare! Verifică dacă serverul este pornit.");
            }
        }
    };

    // --- STILURI ---
    const containerStyle = {
        textAlign: 'center', 
        marginTop: '100px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '80vh'
    };

    const inputStyle = {
        padding: '12px',
        fontSize: '1.2rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        width: '280px',
        textAlign: 'center'
    };

    const joinButtonStyle = {
        padding: '12px 30px',
        fontSize: '1.2rem',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '280px'
    };

    const adminButtonStyle = {
        marginTop: '50px',
        padding: '10px 20px',
        fontSize: '0.9rem',
        backgroundColor: 'transparent',
        color: '#666',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: '0.3s'
    };

    return (
        <div style={containerStyle}>
            <h1>Bun venit!</h1>
            <p style={{ color: '#555', marginBottom: '30px' }}>
                Introdu codul activității pentru a oferi feedback în timp real.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input 
                    type="text" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value.toUpperCase())} 
                    placeholder="COD ACTIVITATE (ex: LAB1)"
                    style={inputStyle}
                />
                <button onClick={handleJoin} style={joinButtonStyle}>
                    Participă la sesiune
                </button>
            </div>

            {/* BUTONUL PENTRU ADMIN */}
            <button 
                onClick={() => navigate('/admin')} 
                style={adminButtonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eee'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                ⚙️ Acces Panel Profesor
            </button>
        </div>
    );
};

export default Home;