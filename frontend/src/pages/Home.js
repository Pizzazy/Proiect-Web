import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [code, setCode] = useState(''); 
    const [loading, setLoading] = useState(false); // Stare pentru spinner
    const navigate = useNavigate();

    const API_URL = "https://proiect-feedback-continuu-c2b9.onrender.com";

    const handleJoin = async () => {
        if (!code) return;
        
        setLoading(true); // Pornim spinner-ul
        try {
            const response = await axios.get(`${API_URL}/activities/${code}`);
            navigate(`/feedback/${response.data._id}`);
        } catch (error) {
            setLoading(false); // Oprim spinner-ul doar dacă e eroare (dacă e succes, oricum navigăm)
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
        backgroundColor: loading ? '#ccc' : '#007BFF', // Culoare gri când se încarcă
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: loading ? 'not-allowed' : 'pointer', // Cursor blocat când se încarcă
        fontWeight: 'bold',
        width: '280px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        transition: '0.3s'
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

    // Stilul pentru animația de spinner (CSS keyframes în JS)
    const spinnerStyle = {
        width: '20px',
        height: '20px',
        border: '3px solid rgba(255,255,255,0.3)',
        borderTop: '3px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    };

    return (
        <div style={containerStyle}>
            {/* Injectăm animația CSS pentru spinner direct în pagină */}
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>

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
                    disabled={loading} // Blocăm inputul în timpul încărcării
                />
                <button onClick={handleJoin} style={joinButtonStyle} disabled={loading}>
                    {loading ? (
                        <>
                            <div style={spinnerStyle}></div>
                            Se încarcă...
                        </>
                    ) : (
                        'Participă la sesiune'
                    )}
                </button>
                
                {loading && (
                    <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '10px' }}>
                        Serverul se trezește, te rugăm să aștepți câteva secunde...
                    </p>
                )}
            </div>

            <button 
                onClick={() => navigate('/admin')} 
                style={adminButtonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eee'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                Acces Panel Profesor
            </button>
        </div>
    );
};

export default Home;