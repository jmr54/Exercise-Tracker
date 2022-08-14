import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercisePage = ({ exerciseEdit}) => {
 
    const [name, setName] = useState(exerciseEdit.name);
    const [reps, setReps] = useState(exerciseEdit.reps);
    const [weight, setWeight] = useState(exerciseEdit.weight);
    const [unit, setUnit] = useState(exerciseEdit.unit);
    const [date, setDate] = useState(exerciseEdit.date);
    
    const history = useHistory();

    const editExcercise = async () => {
        const response = await fetch(`/exercises/${exerciseEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit a exercise in the collection</h2>
            <p>Please make any changes to your exercise</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <label for="name">Exercise</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="title" />

                    <label for="reps">Reps</label>
                    <input
                        type="number"
                        min="0"
                        value={reps}
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />
                    
                    <label for="weight">Weight</label>
                    <input
                        type="number"
                        min="0"
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
                        onChange={e => setDate(e.target.value)} 
                        id="date" />

                    <label for="submit">
                    <button
                        onClick={editExcercise}
                        id="submit"
                    >Save</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;