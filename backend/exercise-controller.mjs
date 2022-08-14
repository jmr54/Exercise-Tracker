import 'dotenv/config';
import express from 'express';
import * as exercises from './exercise-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE exercises 
app.post ('/exercises', (req,res) => { 
    exercises.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
        )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Could not add exercise. Please try again. Status code: 400' });
        });
});


// RETRIEVE all exercise
app.get('/exercises', (req, res) => {
    let filter = {};
    if(req.query.year !== undefined){
        filter = { year: req.query.year };
    }
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Could not get the exercises. Please try again.' });
        });

});

// GET exercise using ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Id is not valid please try again. Status code 404' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Status error 404.' });
        });

});


// Where we update our exercise
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Could not update the Exercise. Status code 404' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Sorry could not update the exercise. Status code 400  ' });
        });
});


// DELETE Controller using ID
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Id is not valid, please try again. Status code 404' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Error occured' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});