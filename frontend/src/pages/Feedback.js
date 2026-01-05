import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Feedback = () => {
    const { id } = useParams(); 

    const API_URL = "http://localhost:5000";

    const sendFeedback = async (type) => {
        try {
            await axios.post(`${API_URL}/feedbacks`, {
                emoticon: type,
                ActivityId: id 
            });
            alert(`Succes! Ai trimis reacția: ${type}`);
        } catch (error) {
            console.error("Eroare la trimitere feedback:", error);
            alert("Hopa! Nu am putut trimite feedback-ul. Verifică dacă serverul este pornit.");
        }
    };

    // --- STILURI ---
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        height: '100vh', 
        gap: '15px',
        padding: '15px',
        boxSizing: 'border-box',
        backgroundColor: '#f4f4f9'
    };

    const cardStyle = (color) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        fontSize: '4rem',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '20px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        ':active': {
            transform: 'scale(0.95)'
        }
    });

    const textStyle = {
        fontSize: '1.2rem',
        marginTop: '10px',
        fontWeight: 'bold',
        color: '#333'
    };

    return (
        <div style={gridStyle}>
            <button 
                onClick={() => sendFeedback('smiley')} 
                style={cardStyle('#D4EDDA')}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <span>😊</span>
                <p style={textStyle}>Mulțumit</p>
            </button>

            <button 
                onClick={() => sendFeedback('frowny')} 
                style={cardStyle('#F8D7DA')}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <span>☹️</span>
                <p style={textStyle}>Nemulțumit</p>
            </button>

            <button 
                onClick={() => sendFeedback('surprised')} 
                style={cardStyle('#FFF3CD')}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <span>😲</span>
                <p style={textStyle}>Surprins</p>
            </button>

            <button 
                onClick={() => sendFeedback('confused')} 
                style={cardStyle('#CCE5FF')}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <span>😕</span>
                <p style={textStyle}>Confuz</p>
            </button>
        </div>
    );
};

export default Feedback;