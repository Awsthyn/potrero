import React, { useState } from 'react';
import style from './SubjectCheckbox.modules.css';

const TypeOfDifficultyCheckbox = ({ initialState, difficulty, onChange }) => {
    const [checked, setChecked] = useState(initialState);

    const onClick = (checked) => {
        setChecked(checked);
        onChange(difficulty, checked);
    }

    return (
        <div id="difficultyInput" className="form-group">
            <input
                type="checkbox"
                className={style}
                onClick={e => onClick(e.target.checked)}
                defaultChecked={checked}
                hidden
                id={`checkboxDifficulty${difficulty.id}`}
            />
            <label style={{ cursor:'pointer', height: "50px", width: "200px" }} htmlFor={`checkboxDifficulty${difficulty.id}`} className="d-flex flex-column justify-content-center rounded shadow form-check-label mr-3" >
                {difficulty.name}
            </label>
        </div>
    )
};

export default TypeOfDifficultyCheckbox;