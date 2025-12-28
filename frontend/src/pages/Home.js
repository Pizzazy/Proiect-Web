import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [code, setCode] = useState(''); 
    const navigate = useNavigate();

    const handleJoin = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/activities/${code}`);
            navigate(`/feedback/${response.data.id}`);
        } catch (error) {
            alert("Codul este greșit sau activitatea nu există!");
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Introdu codul activității</h1>
            <input 
                type="text" 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                placeholder="Ex: WEB2025"
            />
            <button onClick={handleJoin}>Participă</button>
        </div>
    );
};

export default Home;