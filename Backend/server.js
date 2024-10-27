require('dotenv').config(); // For environment variables
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const app = express();

// Use CORS middleware
const corsOptions = {
  origin: 'https://ai-planet-7m1e.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware for parsing form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Check if uploads directory exists, create if not
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpg and .png files are allowed!'));
    }
  }
});

// Connect to MySQL using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Routes to fetch challenge by ID
app.get('/challenge/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM challenges WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Challenge not found');
    }
  });
});

// Route to fetch all challenges
app.get('/challenges', (req, res) => {
  const query = 'SELECT * FROM challenges';

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Route to handle form submission and image upload
app.post(
  '/submit',
  upload.single('image'),
  [
    // Validation for form fields
    check('challengeName').isLength({ min: 3 }).withMessage('Challenge name must be at least 3 characters long'),
    check('startDate').isISO8601().withMessage('Invalid start date format'),
    check('endDate').isISO8601().withMessage('Invalid end date format'),
    check('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { challengeName, startDate, endDate, description, levelType } = req.body;
    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    // Insert query to store challenge details in the database
    const query = 'INSERT INTO challenges (challengeName, startDate, endDate, description, image, levelType) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [challengeName, startDate, endDate, description, imagePath, levelType], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error while submitting challenge');
      }
      res.send('Challenge submitted successfully!');
    });
  }
);

// Error handling for multer file upload
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send(`Multer error: ${err.message}`);
  } else if (err) {
    return res.status(400).send(`Error: ${err.message}`);
  }
  next();
});

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
