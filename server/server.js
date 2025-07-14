const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const initDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
initDB();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
global.io = io;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

io.on('connection', socket => {
  console.log('A client connected.');
  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
