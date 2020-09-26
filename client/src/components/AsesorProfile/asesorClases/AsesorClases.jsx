import React from 'react'
import style from './AsesorClases.module.css';

export default function AsesorClases({user}){
   return (
         <div className = {style.container}>
            <div className = {style.student}>
               <h4 className = {style.name} >{user.firstName}</h4>
            </div>
            <div className = {style.info}>
               <p className = {style.data}><i style = {{color: '#cfcfcf',fontSize: '18px',transform: 'scaleX(-1)', marginRight : '8px'}} class="fas fa-envelope"></i>{user.name}</p>
               <p className = {style.data}><i style = {{color: '#cfcfcf', fontSize: '18px',transform: 'scaleX(-1)', marginRight : '8px'}} class="fas fa-phone"></i>{user.phone}</p>
            </div>
         </div>
   )
}

