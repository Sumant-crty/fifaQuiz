const Score = require("../models/score");

exports.getLeaderboard = async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(50);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveScore = async (req, res) => {
  try {
    const { username, score, totalQuestions } = req.body;
    if (!username || score === undefined)
      return res.status(400).json({ message: "username and score are required" });
    const entry = await Score.create({ username, score, totalQuestions });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
