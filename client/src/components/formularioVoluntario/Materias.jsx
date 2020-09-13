import React from "react";
import style from './Materias.module.css';

export default class Materias extends React.Component {
    constructor(props){
        super()
     
    }
    
    render(){
        console.log(this.props)
        return(
           <div> 
             <div id={this.props.materia} className={style.botonMateria} onClick={(e) => this.props.handleOnClick(e.target.id, e)}>{this.props.materia}</div>     
           </div>
        )
    }
}