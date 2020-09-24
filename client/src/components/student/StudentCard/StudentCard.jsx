import React from 'react';
import style from './StudentCard.module.css';

export default class StudentCard extends React.Component {
    constructor(props) {
        super(props);
        
}

render() {
return(
    
    <div className = {style.container}>
    <div className = {style.student}>
        <i className={`fas fa-circle ${style.online}`}></i>
        <img className = {style.avatar} src = "https://api.adorable.io/avatars/285/abott@adorable.png" alt = ""/>
        <h4 className = {style.name} >Leandro Alvarez</h4>
    </div>
    <div className = {style.info}>
        <p className = {style.data}><i style = {{color: '#cfcfcf',fontSize: '18px',transform: 'scaleX(-1)', marginRight : '8px'}} class="fas fa-envelope"></i>leandroalvarez@gmail.com</p>
        <p className = {style.data}><i style = {{color: '#cfcfcf', fontSize: '18px',transform: 'scaleX(-1)', marginRight : '8px'}} class="fas fa-phone"></i>+549 11 569 985</p>
    </div>
    </div>
    
)
}
}



