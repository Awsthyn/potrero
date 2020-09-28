import React from 'react';
import style from './AsesorStudents.module.css';
import StudentCard from '../../student/StudentCard/StudentCard';

export default class AsesorStudents extends React.Component {
    constructor(props) {
        super(props);
        
}


render() {

   let students = [{
        img : 'leandro',
        name: 'Leandro Alvarez',
        email: 'leandroalvarez@gmail.com',
        phone: '+549 366 569 785'
    },
    {
        img : 'Lucca',
        name: 'Lucca Lipisky',
        email: 'luccalipisky@gmail.com',
        phone: '+549 386 402 692'
    },
    {
        img : 'Marcos',
        name: 'Marcos Mantay',
        email: 'marcosmantay@gmail.com',
        phone: '+549 11 402 692'
    },
    {
        img : 'Agustina',
        name: 'Agustina Rojas',
        email: 'agustinarojas@gmail.com',
        phone: '+549 11 508 331'
    },
    {
        img : 'Nancy',
        name: 'Nancy Acuña',
        email: 'nancyacuña@gmail.com',
        phone: '+549 11 698 326'
    },
    {
        img : 'Elena',
        name: 'Elena Gonzalez',
        email: 'elenagonzalez@gmail.com',
        phone: '+549 11 991 752'
    },
    {
        img : 'Gustavo',
        name: 'Gustavo Altamiranda',
        email: 'gustavoaltamiranda@gmail.com',
        phone: '+549 621 001 511'
    },
    {
        img : 'Martina',
        name: 'Martina Scomazzon',
        email: 'martinascomazzon@gmail.com',
        phone: '+549 351 227 669'
    },
    {
        img : 'Agustin',
        name: 'Agustin Wagner',
        email: 'agustinwagner@gmail.com',
        phone: '+549 388 516 632'
    },
    {
        img : 'Franco',
        name: 'Franco Matus',
        email: 'francomatus@gmail.com',
        phone: '+549 11 562 133'
    }]

return(
    <div className = {style.container}>
        {students.map(s => <StudentCard
            img={`https://api.adorable.io/avatars/285/${s.img}@adorable.png`}
            name={s.name}
            email={s.email}
            phone={s.phone}
          /> )}
    </div>
    
)
}
}