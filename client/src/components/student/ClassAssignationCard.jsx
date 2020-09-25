import React, { useState } from 'react'
import { connect } from 'react-redux'

export const ClassAssignationCard = ({option, id}) => {
    const [checked, setChecked] = useState();
    const startTime = option.disponibleTime[0][0] % 1 === 0 ? String(option.disponibleTime[0][0]) + ":00" : String(option.disponibleTime[0][0]).substring(0,2) + ":30"
    const endTime = option.disponibleTime[0][1] % 1 === 0 ? String(option.disponibleTime[0][1]) + ":00" : String(option.disponibleTime[0][1]).substring(0,2) + ":30"

    const onClick = (checked) => {
        //setChecked(checked);
        //onChange(subject, checked);
    }

    return (
        <div className="form-group">
            <input
                type="radio"
                //className={style}
                name="options"
                onClick={e => onClick(e.target.checked)}
                defaultChecked={checked}
                hidden
                id={`radio${id}`}
            />
            <label style={{ height: "250px", width: "200px" }} htmlFor={`radio${id}`} className="d-flex flex-column wrap justify-content-between rounded shadow form-check-label mr-3" >
                <h5 className="mt-4">{option.user.firstName + " " + option.user.lastName}</h5>
                <h5>{option.nameWeekDay}</h5>
                <h5 className="mb-4">{startTime + " - " + endTime}</h5>
            </label>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassAssignationCard)
