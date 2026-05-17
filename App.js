import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

const API_URL = "http://localhost:5000/api";

// --- LOGIN COMPONENT ---
const Login = ({ setToken }) => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

        const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Button clicked! Attempting to login with:", form);

        try {
            console.log("Sending request to:", `${API_URL}/login`);
            const res = await axios.post(`${API_URL}/login`, form);
            
            console.log("Response received from server:", res.data);
            
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            navigate('/home');
        } catch (err) {
            console.error("FULL ERROR OBJECT:", err);
            if (err.response) {
                // Server responded with a status code (e.g., 400, 404, 500)
                alert(`Server Error: ${err.response.data.error || "Login Failed"}`);
            } else if (err.request) {
                // Request was made but no response received (Backend is OFF)
                alert("Backend server is NOT running! Please start server.js");
            } else {
                alert("An unexpected error occurred: " + err.message);
            }
        }
    };


    return (
        <div className="login-container">
            <div className="login-card">
                <h1>🌊 Ocean Guard</h1>
                <p>Backend Secured Access</p>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" required 
                        onChange={e => setForm({...form, username: e.target.value})} />
                    <input type="password" placeholder="Password" required 
                        onChange={e => setForm({...form, password: e.target.value})} />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

// --- HOME/DASHBOARD COMPONENT ---
const Home = ({ setToken }) => {
    const [analytics, setAnalytics] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: token } };
        try {
            const anaRes = await axios.get(`${API_URL}/analytics`, config);
            const altRes = await axios.get(`${API_URL}/alerts`, config);
            setAnalytics(anaRes.data);
            setAlerts(altRes.data);
        } catch (err) {
            console.error("Error fetching data");
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    return (
        <div className="home-container">
            <nav className="navbar">
                <h2>Ocean Guard Dashboard</h2>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </nav>

            <header className="hero-section">
                <h1>Global Overfishing Analytics</h1>
                <p>Real-time data monitoring and ecological alerts</p>
            </header>

            <div className="dashboard-grid">
                {/* Analytics Chart Card */}
                <div className="card chart-card">
                    <h3>Population Trend (Million Tons)</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={analytics}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="fishPop" stroke="#0077b6" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Alerts Card */}
               <div className="card chart-card">
    <h3>Population Trend (Million Tons)</h3>
    {/* This DIV MUST have a height, otherwise the chart is invisible */}
    <div style={{ width: '100%', height: '300px' }}> 
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="fishPop" stroke="#0077b6" strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    </div>
</div>

            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/home" element={token ? <Home setToken={setToken} /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}
