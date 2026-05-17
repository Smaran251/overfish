




const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

console.log("📋 Environment Check:");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ NOT FOUND");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ NOT FOUND");
console.log("PORT:", process.env.PORT || 5000);

// Test route - no dependencies
app.post('/api/login', (req, res) => {
    try {
        console.log("🔐 Login request received");
        console.log("Body:", req.body);
        
        const { username, password } = req.body;
        
        // Simple mock login - no database
        if (username === 'admin' && password === 'password123') {
            console.log("✅ Login successful!");
            res.json({ token: 'mock-token-12345' });
        } else {
            console.log("❌ Invalid credentials");
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
const authenticateToken = (req, res, next) => {
    // This checks for 'Authorization' header OR 'authorization' header
    const token = req.headers['authorization'] || req.headers['Authorization'];
    
    if (!token) {
        return res.status(401).json({ error: "Access Denied: No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or Expired Token" });
        }
        req.user = user;
        next();
    });
};
