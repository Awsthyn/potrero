import React, { useState } from 'react';
import style from './SubjectCheckbox.modules.css';

const LevelEducation = ({ initialState, level, onChange }) => {
    const [checked, setChecked] = useState(initialState);

    const onClick = (checked) => {
        setChecked(checked);

        onChange(level, checked);
    }

    return (
        <div className="form-group">
            <input
                type="checkbox"
                className={style}
                onClick={e => onClick(e.target.checked)}
                checked={checked}
                hidden
                id={`checkboxStrength${level.id}`}
            />
            <label style={{ height: "50px", width: "200px", backgroundColor: '#492BC4', color: 'white' }} htmlFor={`checkboxStrength${level.id}`} className="d-flex flex-column justify-content-center rounded  form-check-label mr-3" >
                {level.name}
            </label>
        </div>
    )
};

export default LevelEducation;