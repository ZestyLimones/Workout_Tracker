const router = require('express').Router();
const Workout = require('../models/workout');

router.get('/api/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ]).then((workoutData) => {
    res.json(workoutData);
  });
});

router.put('/api/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        exercises: req.body,
      },
    },
    {
      new: true,
    }
  ).then((workoutData) => {
    res.json(workoutData);
  });
});

router.post('/api/workouts', (req, res) => {
  Workout.create({}).then((workoutData) => {
    res.json(workoutData);
  });
});

router.get('/api/workouts/range', (req, res) => {});

module.exports = router;
