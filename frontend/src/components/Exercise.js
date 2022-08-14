import React from 'react';
import { BiTrash, BiEditAlt} from "react-icons/bi";

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><BiTrash onClick={() => onDelete(exercise._id)} /></td>
            <td><BiEditAlt onClick={() => onEdit(exercise)} /></td>
        </tr>
    );
}

export default Exercise;