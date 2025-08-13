const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Work', 'Personal', 'Shopping', 'Other'],
        default: 'Other',
    },
    priority: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low'], // Example priorities
        default: 'Medium',
    },
    duedate: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;