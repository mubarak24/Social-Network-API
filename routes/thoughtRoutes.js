const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get thoughts' });
  }
});

// GET a single thought by id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id)
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get thought' });
  }
});

// POST create a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create thought' });
  }
});

// PUT update a thought by id
router.put('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update thought' });
  }
});

// DELETE remove a thought by id
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete thought' });
  }
});

// POST create a reaction for a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
      const thought  = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought ) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// DELETE remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
);

module.exports = router;
