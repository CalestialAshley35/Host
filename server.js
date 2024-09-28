const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('websites'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const websiteName = req.body['website-name'];
    const dir = `./websites/${websiteName}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Route to handle file uploads
app.post('/upload', upload.fields([{ name: 'html-file' }, { name: 'css-file' }, { name: 'js-file' }]), (req, res) => {
  const websiteName = req.body['website-name'];
  const url = `https://www.hostonic.onrender/${websiteName}`;
  res.json({ message: `Website hosted! You can access it at: ${url}` });
});

// Serve individual hosted websites
app.use('/websites/:name', (req, res, next) => {
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
