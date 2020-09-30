import React from 'react';
import style from './AsesorStudents.module.css';
import StudentCard from '../../student/StudentCard/StudentCard';

export default class AsesorStudents extends React.Component {
    constructor(props) {
        super(props);
        
}

render() {

return(
    <div className = {style.container}>
        {this.props.students?.map(s => <StudentCard
            img={`https://api.adorable.io/avatars/285/${s.img}@adorable.png`}
            name={s.name}
            email={s.email}
            phone={s.phone}
            key={s.id}
        /> )}
    </div>
    
)
}
}