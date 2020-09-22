import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Bar, Line, Pie} from 'react-chartjs-2';
import * as actions from '../../redux/actions/stats.js';

export default function AllAssistancesStudents(){
    
    const dispatch = useDispatch();
    const assistance = useSelector( state =>  state.stats.allAssistances);
    const [state, setState] = useState({chartData: {}});

    useEffect(() => {
        dispatch(actions.getAllAssistance());
    }, []);

  const getChartData = () => {
      setState({
          chartData:{
              labels: ['Asistencias','Inasistencias', 'Tardanzas'],
              datasets:[
                  {
                      label: 'Asistencias totales',
                      data: [assistance.assistance, assistance.inassistance, assistance.delay],
                      backgroundColor:[
                          'rgba(255, 99 , 132, 0.6)',
                          'rgba(54, 162 , 235, 0.6)',
                          'rgba(153, 102 , 255, 0.6)'
                      ]
                  }
              ]
          }
      }
    )
  }
       const defaultProps = {
       displayTitle: true,
       displayLegend: true,
       legendPosition: 'right',
       location: 'Asistencias totales'
  }
      return (
          <div>
              <div>
              <Pie
              data = {state.chartData}
              options ={{
                title:{
                    display: defaultProps.displayTitle,
                    text: defaultProps.location,
                    fontSize: 25
                },
                legend:{
                    display:  defaultProps.displayLegend,
                    position:  defaultProps.legendPosition,
                    labels:{
                        fontColor: '#000'
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                  }}>
                 </Pie>
                  <button className="btn btn-success" style={{display: 'flex', float: 'left'}} onClick={()=> getChartData()}>Ver estadísticas</button>
                  </div>
          </div>
      )
}
