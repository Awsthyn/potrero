import React from 'react';
import style from './Spinner.module.css';
import iso from '../VolunteerFormAssets/iso.png';

export default function Spinner() {
    return(
    
    <div className = {style.container}>
        <img src = {iso} alt = "" className = {style.iso}></img>
    </div>
    )
}