const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('websites'));
app.use(express.json()); // To parse JSON bodies

// Route to host the website
app.post('/host', (req, res) => {
    const { websiteName, htmlCode, cssCode, jsCode } = req.body;

    const dir = path.join(__dirname, 'websites', websiteName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // Create directory recursively
    }

    // Create the HTML file
    fs.writeFileSync(path.join(dir, 'index.html'), htmlCode);

    // Create the CSS file if provided
    if (cssCode) {
        fs.writeFileSync(path.join(dir, 'style.css'), cssCode);
    }

    // Create the JS file if provided
    if (jsCode) {
        fs.writeFileSync(path.join(dir, 'script.js'), jsCode);
    }

    res.json({ message: `Website hosted! You can access it at: https://www.hostonic.onrender.com/${websiteName}` });
});

// Serve individual hosted websites
app.get('/:name', (req, res) => {
    const websitePath = path.join(__dirname, 'websites', req.params.name, 'index.html');
    if (fs.existsSync(websitePath)) {
        res.sendFile(websitePath);
    } else {
        res.status(404).send('Website not found!');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
