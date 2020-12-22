const mongoose = require('mongoose');
// const validator = require('validator');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

taskSchema.pre('save', async function (next) {
  const task = this;

  console.log('Just Before task saving');

  next();
});
const Tasks = mongoose.model('tasks', taskSchema);

module.exports = Tasks;
