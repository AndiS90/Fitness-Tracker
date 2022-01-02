const mongoose = require("mongoose");
const router = require("express").Router();
const Workout = require("../models/Workout");

//get that retrieves all workout data from the db
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        }, ])
        .then((dbWO) => {
            res.json(dbWO);
        })
        .catch((err) => {
            res.json(err);
        });
});

//post route that takes in the body request and sets it as a new instance of Workout which is then added to the db
router.post("/api/workouts", ({
    body
}, res) => {
    Workout.create(body)
        .then((dbWO) => {
            // console.log(dbWO);

            res.json(dbWO);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// put (update) route at /api/workouts/:id that takes in the body and parameters and responds by finding the workout corresponding to the id and pushing the body content to the db
// then responds with a json'd version of the db data
router.put('/api/workouts/:id', ({
    body,
    params
}, res) => {
    Workout.findByIdAndUpdate(params.id, {
            $push: {
                exercises: body
            }
        },
        //{new: true}
    ).then((dbWO) => {
        res.json(dbWO);
    }).catch((err) => res.json(err));
});

//get route to /api/workouts/range that responds with the added field totalDuration that includes the sum of previous 7 durations and total weight
// including the sum of the last 7previous weights
router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration',
            },
            totalWeight: {
                $sum: "$exercises.weight"
            }
        }
    }]).sort({
        day: -1
    }).limit(7).then((dbWO) => {
        console.log(dbWO);
        res.json(dbWO);
    }).catch((err) => {
        res.json(err);
    });
});




// //delete route at api/workouts that finds by the 
// router.delete('/api/workouts', (req, res) => {
//     Workout.findByIdAndDelete(req.body.params.id)
//         .then(() => {
//             res.json(true);
//         }).catch((err) => {
//             res.json(err);
//         });
// });

module.exports = router;