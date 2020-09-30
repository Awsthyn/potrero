import React from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

class OffersWithDemand extends React.Component {
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
      countOffers: respuesta.totalOffers,
      countDemands: respuesta.totalDemands
    });
  }

  getChartData() {
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
    //Preparamos los colores para que se repita según la cantidad de la longitud de los nombres de materia
    for (let i = 0; i < nombreMatOf.length; i++) {
      colorOferta.push("rgba(73, 43, 196, 0.6)");
    }

    for (let i = 0; i < nombreMatOf.length; i++) {
      colorDemanda.push("rgba(140, 198, 62, 0.6)");
    }

    const data = {
      labels: nombreMatOf,
      datasets: [
        {
          label: "Oferta de materias " + this.state.countOffers,
          data: countNombreMatOf,
          fill: false,
          backgroundColor: colorOferta,

          borderWidth: 1,
        },
        {
          label: "Demanda de materias " + this.state.countDemands,
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
    const enviarDetalles = {
      pathname: "/admin/detalle/materias",
      demandas: this.state.demand,
      ofertas: this.state.offers
    };
    return (
      <div>
        <h4>Ofertas y demandas de materias</h4>
        <Bar
          type
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontColor: "black",
                fontSize: 15,
              },
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(0, 0, 0, 1)",
                    fontSize: 15,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    suggestedMin: 0,
                    stepSize: 2,
                    fontColor: "rgba(0, 0, 0, 1)",
                    fontSize: 15,
                  },
                },
              ],
            },
          }}
        ></Bar>
         <Link to={enviarDetalles}><button className="btn btn-primary ocultoimpresion">Enviame</button></Link>
      </div>
    );
  }
}

export default OffersWithDemand;
