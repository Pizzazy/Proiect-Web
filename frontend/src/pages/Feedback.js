import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Feedback = () => {
    const { id } = useParams(); 

    const sendFeedback = async (type) => {
        try {
            await axios.post('http://localhost:5000/feedbacks', {
                emoticon: type,
                ActivityId: id
            });
            alert(`Ai trimis: ${type}!`);
        } catch (error) {
            console.error("Eroare la trimitere:", error);
        }
    };


    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        height: '100vh', 
        gap: '10px',
        padding: '10px'
    };

    const cardStyle = (color) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        fontSize: '3rem',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '15px',
        transition: '0.3s'
    });

    return (
        <div style={gridStyle}>
            <button onClick={() => sendFeedback('smiley')} style={cardStyle('#D4EDDA')}>
                <span>😊</span>
                <p style={{fontSize: '1rem'}}>Multumit</p>
            </button>
            <button onClick={() => sendFeedback('frowny')} style={cardStyle('#F8D7DA')}>
                <span>☹️</span>
                <p style={{fontSize: '1rem'}}>Nemulțumit</p>
            </button>
            <button onClick={() => sendFeedback('surprised')} style={cardStyle('#FFF3CD')}>
                <span>😲</span>
                <p style={{fontSize: '1rem'}}>Surprins</p>
            </button>
            <button onClick={() => sendFeedback('confused')} style={cardStyle('#CCE5FF')}>
                <span>😕</span>
                <p style={{fontSize: '1rem'}}>Confuz</p>
            </button>
        </div>
    );
};

export default Feedback;