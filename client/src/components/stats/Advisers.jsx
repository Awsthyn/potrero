import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import DetalleAsesores from "./printDetail/DetalleAsesores";
import "./style.css";

class Advisers extends React.Component {
  state = {
    info: [],
    totalAdvisors: 0,
    totalAdvisorsActives: 0,
    totalAdvisorsInactives: 0,
    promedioActives: 0,
    promedioInactives: 0,
    total: []
  };

  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/advisorstatus");
    var respuesta = await peticion.json();

    let advisorsTemp = [];

    advisorsTemp = respuesta.advisorsActives;

    respuesta.advisorsInactives.forEach((advisorsTotal) => {
      advisorsTemp.push(advisorsTotal);
    });

    this.setState({
      total: respuesta,
      info: advisorsTemp,
      totalAdvisors: respuesta.totalAdvisors,
      totalAdvisorsActives: respuesta.totalAdvisorsActives,
      totalAdvisorsInactives: respuesta.totalAdvisorsInactives,
    });

    this.state.promedioActives =
      this.state.totalAdvisorsActives / this.state.totalAdvisors;
    this.state.promedioInactives =
      this.state.totalAdvisorsInactives / this.state.totalAdvisors;
  }

  getChartData() {
    const datos = {
      labels: [
        "Activos " +
          (this.state.promedioActives > 0
            ? Math.round(this.state.promedioActives * 100) + "%"
            : ""),
        "Inactivos " +
          (this.state.promedioInactives > 0
            ? Math.round(this.state.promedioInactives * 100) + "%"
            : ""),
      ],
      datasets: [
        {
          label: "Asesores",
          data: [
            this.state.totalAdvisorsActives,
            this.state.totalAdvisorsInactives,
          ],
          backgroundColor: [
            "rgba(73, 43, 196, 0.6)",
            "rgba(140, 198, 62, 0.6)",
            "rgba(71, 165, 214, 0.6)",
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
      location: "Asistencias totales",
      legend: {
        labels: {
          fontColor: "black",
          fontSize: 15,
        },
      },
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
    const EnviarDetallesAsistentes = {
      pathname: "/admin/detalleasesores",
      probandoAdvisor: this.state,
    };
    return (
      <div className="genAsist">
        <h4>{"Asesores: " + this.state.totalAdvisors}</h4>
        <Doughnut
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
          }}
        ></Doughnut>
        <Link to={EnviarDetallesAsistentes}>
          <button className="btn btn-primary ocultoimpresion">
            Ver detalles
          </button>
        </Link>
      </div>
    );
  }
}

export default Advisers;
