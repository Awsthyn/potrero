import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Bar, Line, Pie} from 'react-chartjs-2';
import * as actions from '../../redux/actions/stats.js';

class MiStats extends React.Component{
    state={
        respuesta:[],
        dataAssistance:[],
        dataInassistance:[],
        dataDelay:[],
        datos:[],
        opciones:[],
    }

    async peticion(){
        var peticion= await fetch('http://localhost:3001/stats/assistances');
        var respuesta= await peticion.json();
        console.log(respuesta)
        var dataAssistance=[];
        var dataInassistance=[];
        var dataDelay=[];
        this.setState({
            respuesta: respuesta
        })

            dataAssistance.push(respuesta.assistance);
            dataInassistance.push(respuesta.inassistance);
            dataDelay.push(respuesta.delay);

        this.setState({
            respuesta: respuesta,
            dataAssistance: dataAssistance,
            dataInassistance: dataInassistance,
            dataDelay: dataDelay,
        })
        console.log("Soy dataAssistance",this.state.dataAssistance)
        console.log("Soy dataInassistance",this.state.dataInassistance)
        console.log("Soy delay",this.state.dataDelay)
    }

  getChartData(){
          const datos={
              labels: ['Asistencias','Inasistencias', 'Tardanzas'],
              datasets:[
                  {
                      label: 'Asistencias totales',
                      data: [this.state.dataAssistance, this.state.dataInassistance, this.state.dataDelay],
                      backgroundColor:[
                          'rgba(255, 99 , 132, 0.6)',
                          'rgba(54, 162 , 235, 0.6)',
                          'rgba(153, 102 , 255, 0.6)'
                                        ]
                  }
              ]}
              console.log("Soy datos" ,datos)
               const opciones= {
                   responsive: true,
                   maintainAspectRatio: false,
                   displayTitle: true,
                   displayLegend: true,
                   legendPosition: 'right',
                   location: 'Asistencias totales',
               }
               this.setState({
                   datos: datos,
                   opciones: opciones,
               })
        }

        async componentDidMount(){
            await this.peticion();
            await this.getChartData();
        }
     render(){
      return (
        <div>
              <Pie
              data = {this.state.datos}
              options ={{
                responsive: true,
                maintainAspectRatio: false,
                  }}>
                 </Pie>
          </div>
      )
  }
}

export default MiStats;
