import React from 'react';
import style from './StudentCard.module.css';

export default class StudentCard extends React.Component {
    constructor(props) {
        super(props);
        
}

render() {
return(
    <div className = {style.outer}>
    <div className = {style.container}>
    <div className = {style.student}>
        <i className={`fas fa-circle ${style.online}`}></i>
        <img className = {style.avatar} src = {this.props.img} alt = ""/>
        <h4 className = {style.name} >{this.props.name}</h4>
    </div>
    <div className = {style.info}>
        <p className = {style.data}><i style = {{color: '#cfcfcf',fontSize: '18px',transform: 'scaleX(-1)', marginRight : '8px'}} class="fas fa-envelope"></i>{this.props.email}</p>
        <p className = {style.data}><i style = {{color: '#cfcfcf', fontSize: '18px',transform: 'scaleX(-1)', marginRight : '8px'}} class="fas fa-phone"></i>{this.props.phone}</p>
    </div>
    </div>
    </div>
    
)
}
}



