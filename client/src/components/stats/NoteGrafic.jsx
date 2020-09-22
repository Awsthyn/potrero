import { useSelector, useDispatch } from 'react-redux';
import { Pie, Line, Bar} from 'react-chartjs-2';
import * as actions from '../../redux/actions/stats.js';
import React from 'react';

class NoteGrafic extends React.Component{
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
    }

  getChartData(){
          const datos={
              //hacer map para labels
              labels: ['Oferta ','Demanda', 'Otra cosa'],
              datasets:[
                  {
                      label: 'Asistencias totales',
                      //map para data
                     /* data: [this.state.dataAssistance, this.state.dataInassistance, this.state.dataDelay],*/
                     data:[50,100,200],
                      fill: false,
                      backgroundColor:[
                          'rgba(140, 198, 62, 0.6)',
                          'rgba(54, 162 , 235, 0.6)',
                          'rgba(73, 43, 196, 0.6)',
                                        ]
                  }
              ]}
              console.log("Soy datos" ,datos)
               const opciones= {
                   responsive: true,
                   maintainAspectRatio: false,
                   displayTitle: true,
                   displayLegend: true,
                   legendPosition: 'bottom',
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
              <Bar
              type
              data = {this.state.datos}
              options ={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
           yAxes: [{
               ticks: {
                   suggestedMin: 50,
                   suggestedMax: 100
               }
           }]
       }

                  }}>
                 </Bar>
          </div>
      )
  }
}

export default NoteGrafic;
