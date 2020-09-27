import { useSelector, useDispatch } from "react-redux";
import { Pie, Line, Bar } from "react-chartjs-2";
import * as actions from "../../redux/actions/stats.js";
import React from "react";

class Demands extends React.Component {
  state = {
    datos: [],
    opciones: [],
    total: 0,
  };

  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/demand/subject");
    var demandas = await peticion.json();
    var dataAssistance = [];
    var dataInassistance = [];
    var dataDelay = [];
    this.setState({
      demand: demandas.onlyDemand,
      total: demandas.demandSubjects,
    });
  }

  getChartData() {
    const demOffer = [];
    this.state.demand && this.state.demand.forEach((e) => {
      let nombre = Object.keys(e);
      demOffer.push(nombre[0]);
    });
    const countdemOffer = [];
    if(this.state.demand && this.state.demand.length > 0){
      for (let i = 0; i < this.state.demand.length; i++) {
        for (const property in this.state.demand[i]) {
          countdemOffer.push(this.state.demand[i][property]);
        }
      }
    }
   
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
        <h3>{"Demandas de materias: " + this.state.total}</h3>
        <Bar
          type
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: true,
              yAxes: [{
                  ticks: {
                      min: 0,
                      max: 100,
                      stepSize: 10.0
                  }
              }]
          }}
        ></Bar>
      </div>
    );
  }
}

export default Demands;
