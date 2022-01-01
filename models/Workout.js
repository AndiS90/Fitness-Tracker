const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    exercise: [{
        type: {
            type: String,
            trim: true,
            required: 'Must enter exercise type'
        },
        name: {
            type: String,
            trim: true,
            required: 'Must enter name of exercise'
        },
        duration: {
            type: Number,
            required: 'Must enter minute duration of exercise'
        },
        weight: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        distance: {
            type: Number,
        },

    }, ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;