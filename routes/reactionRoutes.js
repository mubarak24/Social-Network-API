const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// POST create a reaction for a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create reaction' });
  }
});

// DELETE remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    thought.reactions.pull({ _id: req.params.reactionId });
    await thought.save();
    res.json({ message: 'Reaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete reaction' });
  }
});

module.exports = router;
