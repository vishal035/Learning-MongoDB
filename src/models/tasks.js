const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Tasks = mongoose.model('tasks', taskSchema);

taskSchema.pre('save', async function (next) {
  const task = this;

  console.log('Just Before task saving');

  next();
});

module.exports = Tasks;
