const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST add a friend to a user
router.post('/:userId/friends', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const friendId = req.body.friendId;
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: 'Friend already added' });
    }
    user.friends.push(friendId);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add friend' });
  }
});

// DELETE remove a friend from a user
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const friendId = req.params.friendId;
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ error: 'Friend not found' });
    }
    user.friends.pull(friendId);
    await user.save();
    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to remove friend' });
  }
});

module.exports = router;
