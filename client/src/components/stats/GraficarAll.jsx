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
     demanda: respuesta.allDemands,
      offers: respuesta.allOffer,
      totalDemands : respuesta.totalDemands,
      totalOffers: respuesta.totalOffers,
    });
  }

  getChartData() {
    const demOffer = [];
    this.state.offers.forEach(e => {
       let nombre = Object.keys(e)
       demOffer.push(nombre[0])
    })
    console.log(demOffer)
    const countdemOffer = []
    for(let i= 0; i < this.state.offers.length; i++){
        for (const property in this.state.offers[i]) {
          countdemOffer.push(this.state.offers[i][property])
        }
      }

    const data = {
      //hacer map para labels
      labels: demOffer,
      datasets: [
        {
          label: "Oferta de materias",
          data: [4],
          fill: false,
          backgroundColor: [
            "rgba(73, 43, 196, 0.6)",
            "rgba(73, 43, 196, 0.6)",
            "rgba(73, 43, 196, 0.6)",
          ],

           borderWidth: 1
        },
        {
          label: "Demanda de materias",
          data: [3, 5 ,7],
          fill: false,
          backgroundColor: [
            "rgba(140, 198, 62, 0.6)",
            "rgba(140, 198, 62, 0.6)",
            "rgba(140, 198, 62, 0.6)",
          ],
           borderWidth: 1
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
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            }]
        }
        }}
        ></Bar>
      </div>
    );
  }
}

export default GraficarAll;
