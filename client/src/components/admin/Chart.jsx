import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends React.Component{
        constructor(props) {
    super(props);
    this.state = {
        chartData:{}
    }
  }

  componentWillMount(){
      this.getChartData();
  }

  getChartData(){
      this.setState({
          chartData:{
              labels: ['Asistencia','Nivel Primario', 'Nivel Secundario'],
              datasets:[
                  {
                      label: 'Asistencia',
                      data:[
                          100,
                          30,
                          50
                      ],
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
  render() {
      return (
          <div>
              <Pie
              data = {this.state.chartData}
              options ={{
                  
                  }}
                  />
          </div>
      )
  }
}

export default Chart;
