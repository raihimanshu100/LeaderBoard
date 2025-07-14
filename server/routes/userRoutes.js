const express = require('express');
const {
  getAllUsers,
  createUser,
  assignPoints,
  fetchLeaderboard
} = require('../controllers/userController');

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.post('/claim/:userId', assignPoints);
router.get('/leaderboard', fetchLeaderboard);

module.exports = router;
