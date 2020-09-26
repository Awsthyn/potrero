import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import CardParent from "./ClassAssignationChild"
import { getMatchingSchedules } from '../../../redux/actions/class';



export const ClassAssignation = ({getMatchingSchedules, matchingSchedule}) => {
    const [checked, setChecked] = useState();

    useEffect(() => {
        getMatchingSchedules(1,5)
    }, [getMatchingSchedules])
    
    const onClick = (checked) => {
        //setChecked(checked);
        //onChange(subject, checked);
    }
    return (
        <div>
            <h1>Horarios disponibles para asignar</h1>
            <div className="d-flex flex-wrap flex-row">
            {matchingSchedule.length > 0 ? 
            matchingSchedule.map((e,i) => <CardParent onClick={onClick} key={i} option={e} id={i} />) 
            : null}
            </div>    
        </div>
    )
}

const mapStateToProps = (state) => ({
    matchingSchedule: state.students.matchingSchedule,
    students: state.students.students
});

const mapDispatchToProps = (dispatch) => {
	return {
        getMatchingSchedules: (studentId, subjectId) => dispatch(getMatchingSchedules(studentId, subjectId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassAssignation)
