const User = require('../models/User');
const History = require('../models/History');

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

exports.createUser = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });

  const newUser = await User.create({ name });

  global.io.emit('user-added', newUser);

  const updatedLeaderboard = await User.find().sort({ totalPoints: -1 });
  global.io.emit('update-leaderboard', updatedLeaderboard);

  res.status(201).json(newUser);
};



exports.assignPoints = async (req, res) => {
  const { userId } = req.params;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  user.totalPoints += randomPoints;
  await user.save();

  await History.create({
    userId,
    userName: user.name,
    pointsGiven: randomPoints,
  });

  const updatedRanking = await User.find().sort({ totalPoints: -1 });
  global.io.emit('update-leaderboard', updatedRanking);

  res.json({ points: randomPoints });
};

exports.fetchLeaderboard = async (req, res) => {
  const leaderboard = await User.find().sort({ totalPoints: -1 });
  res.status(200).json(leaderboard);
};
