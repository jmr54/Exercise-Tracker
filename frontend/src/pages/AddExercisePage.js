import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`"Successfully added ${name} to the list!"`);
        } else {
            alert(`Failed to add ${name}, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>Please add your exercise down below</h2>
            <p>Please make sure to input valid exercise information down below</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <label for="name">Exercise</label>
                    <input
                        type="text"
                        placeholder="Exercise Name"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="title" />
                    
                    <label for="reps">Reps</label>
                    <input
                        type="number"
                        min="0"
                        value={reps}
                        placeholder="Number of reps"
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />

                    <label for="weight">Weight</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="How heavy"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" />
                    
                    <label for="unit">Unit</label>
                    <form>
                    <select value={unit} onChange={e => setUnit(e.target.value)} >
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                    <option value="miles">miles</option>
                    </select>
                    </form>

                    <label for="date">Date</label>
                    <input
                        type="date"
                        value={date}
                        placeholder="Date"
                        onChange={e => setDate(e.target.value)} 
                        id="date" />

                    <label for="submit">
                    <button
                        type="submit"
                        onClick={addExercise}
                        id="submit"
                    >Add</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddExercisePage;