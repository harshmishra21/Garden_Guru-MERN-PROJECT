const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Uploads folder se static files serve karo
app.use('/uploads', express.static('uploads'));
app.use('/plants', express.static('uploads/plants'));


app.get('/', (req, res) => {
    res.send('GardenGuru API is running');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/plants', require('./routes/plantRoutes'));
app.use('/api/garden', require('./routes/gardenRoutes'));
app.use('/api/logs', require('./routes/logRoutes'));
app.use('/api/reminders', require('./routes/reminderRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
