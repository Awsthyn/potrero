import { useSelector, useDispatch } from "react-redux";
import { Pie, Line, Bar } from "react-chartjs-2";
import * as actions from "../../redux/actions/stats.js";
import React from "react";

class Demands extends React.Component {
  state = {
    datos: [],
    opciones: [],
  };

  async peticion() {
    
    var peticion = await fetch("http://localhost:3001/stats/demand/subject");
    var demandas = await peticion.json();
    console.log(demandas);
    var dataAssistance = [];
    var dataInassistance = [];
    var dataDelay = [];
    this.setState({
      demand: demandas.onlyDemand,
    });
  }

  getChartData() {
    const demOffer = [];
    this.state.demand.forEach(e => {
       let nombre = Object.keys(e)
       demOffer.push(nombre[0])
    })

    const countdemOffer = []
    for(let i= 0; i < this.state.demand.length; i++){
        for (const property in this.state.demand[i]) {
          //console.log(property);
          countdemOffer.push(this.state.demand[i][property])
        }
      } 
      console.log(countdemOffer);

    const datos = {
      //hacer map para labels
      labels: demOffer,
      datasets: [
        {
          label: "Demandas de materias",
          data: countdemOffer,
          fill: false,
          backgroundColor: [
            // 73, 43, 196, 0.6   -     140, 198, 62, 0.6  - 71, 165, 214, 0.6  -  	171, 70, 208, 0.6    -   240, 198, 49, 0.6
            "rgba(73, 43, 196, 0.6)",
            "rgba(140, 198, 62, 0.6)",
            "rgba(71, 165, 214, 0.6)",
            "rgba(71, 165, 214, 0.6)",
            "rgba(240, 198, 49, 0.6)",
          ],
        },
      ],
    };
    const opciones = {
      responsive: true,
      maintainAspectRatio: false,
      displayTitle: true,
      displayLegend: true,
      legendPosition: "bottom",
    };
    this.setState({
      datos: datos,
      opciones: opciones,
    });
  }

  async componentDidMount() {
    await this.peticion();
    await this.getChartData();
  }

  render() {
    return (
      <div>
        <Bar
          type
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        ></Bar>
      </div>
    );
  }
}

export default Demands;
