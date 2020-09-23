import React, { useState } from 'react';
import style from './SubjectCheckbox.modules.css';


const SubjectCheckbox = ({ initialState, subject, onChange }) => {

    const [checked, setChecked] = useState(initialState);

    const onClick = (checked) => {
        setChecked(checked);
        onChange(subject, checked);
    }

    return (
        <div className="form-group">
            <input
                type="checkbox"
                className={style}
                onClick={e => onClick(e.target.checked)}
                defaultChecked={checked}
                hidden
                id={`checkbox${subject.id}`}
            />
            <label style={{ height: "50px", width: "200px" }} htmlFor={`checkbox${subject.id}`} className="d-flex flex-column justify-content-center rounded shadow form-check-label mr-3" >
                {subject.name}
            </label>
        </div>
    )
};

export default SubjectCheckbox;