const express = require('express');
const Task = require('../models/tasks');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get/tasks?completed=true
// Get/tasks?limit="Any Number"
// Get/tasks?skip="Any Number"
// Get/tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  try {
    // const tasks = await Task.find({owner: req.body._id})
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          skip: parseInt(req.query.skip),
          limit: parseInt(req.query.limit),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something Went Wrong!!!☠');
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id)
    // const task = await Task.findOne({ _id, owner: req.user._id });
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send({ Error: "Task doesn't exists!" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' });
  }

  try {
    // const task  = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    // const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ error: 'Task does not exists!' });
    }

    res.send(`${task}\nTask removed`);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
