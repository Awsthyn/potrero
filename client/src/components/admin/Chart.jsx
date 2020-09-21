import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends React.Component{
        constructor(props){
            super(props);
            this.state={
                chartData: props.chartData
            }
        }
   static defaultProps ={
       displayTitle: true,
       displayLegend: true,
       legendPosition: 'right',
       location: 'Barrio'
   }
  render() {
    return (
      <div className ="chart">
        <h2>Datos Relevados</h2>
        
            <Pie
             data={this.state.chartData}
             options={{
                 title:{
                     display: this.props.displayTitle,
                     text: 'Zona  '+this.props.location,
                     fontSize: 25
                 },
                 legend:{
                     display: this.props.displayLegend,
                     position: this.props.legendPosition,
                     labels:{
                         fontColor: '#000'
                     }
                 }
             }}
              />
      </div>
    );
  }
}

export default Chart;
