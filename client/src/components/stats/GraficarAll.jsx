import { useSelector, useDispatch } from "react-redux";
import { Pie, Line, Bar } from "react-chartjs-2";
import * as actions from "../../redux/actions/stats.js";
import React from "react";

class GraficarAll extends React.Component {
  state = {
    datos: [],
    opciones: [],
    total: 0,
  };

  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/demandwithoffer");
    var respuesta = await peticion.json();

    this.setState({
      demand: respuesta.allDemands,
      offers: respuesta.allOffer,
      totalDemands: respuesta.totalDemands,
      totalOffers: respuesta.totalOffers,
    });
  }

  getChartData() {
    console.log(this.state);

    const nombreMatOf = [];
    const countNombreMatOf = [];
    const nombreMatDem = [];
    const countNombreMatDem = [];

    //Pusheo los nombres de materias
    this.state.offers.forEach((e) => {
      let nombre = Object.keys(e);
      nombreMatOf.push(nombre[0]);
    });

    //Pusheo la longitud a los nombres de materias
    for (let i = 0; i < this.state.offers.length; i++) {
      for (const property in this.state.offers[i]) {
        countNombreMatOf.push(this.state.offers[i][property].length);
      }
    }

    //Pusheo los nombres de materias
    this.state.demand &&
      this.state.demand.forEach((e) => {
        let nombre = Object.keys(e);
        nombreMatDem.push(nombre[0]);
      });

    //Pusheo la longitud a los nombres de materias
    if (this.state.demand.length > 0) {
      for (let i = 0; i < this.state.demand.length; i++) {
        for (const property in this.state.demand[i]) {
          countNombreMatDem.push(this.state.demand[i][property].length);
        }
      }
    }

    let colorOferta = [];
    let colorDemanda = [];
    //Preparamos los colores para q se repita segun la cantidad de la longitud de los nombres de materia
    for (let i = 0; i < nombreMatOf.length; i++) {
      colorOferta.push("rgba(73, 43, 196, 0.6)");
    }

    for (let i = 0; i < nombreMatOf.length; i++) {
      colorDemanda.push("rgba(140, 198, 62, 0.6)");
    }

    console.log(colorOferta);

    const data = {
      //hacer map para labels
      labels: nombreMatOf,
      datasets: [
        {
          label: "Oferta de materias",
          data: countNombreMatOf,
          fill: false,
          backgroundColor: colorOferta,

          borderWidth: 1,
        },
        {
          label: "Demanda de materias",
          data: countNombreMatDem,
          fill: false,
          backgroundColor: colorDemanda,
          borderWidth: 1,
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
      datos: data,
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
        <h3>{"Ofertas/Demanda de materias: " + this.state.total}</h3>
        <Bar
          type
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    suggestedMin: 0,
                    stepSize: 2,
                  },
                },
              ],
              // INTENTO DE AMPLIAR LETRA
              xAxes: [{
                fontSize: 40
              }]
            },
          }}
        ></Bar>
      </div>
    );
  }
}

export default GraficarAll;
