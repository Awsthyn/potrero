import React from "react";
import { Doughnut } from "react-chartjs-2";

class Advisers extends React.Component {
  state = {
    totalAdvisors: 0,
    totalAdvisorsActives: 0,
    totalAdvisorsInactives: 0,
    promedioActives: 0,
    promedioInactives: 0,
  };

  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/advisorstatus", {
      withCredentials: true,
    });
    var respuesta = await peticion.json();
    this.setState({
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
        "Activos " + Math.round(this.state.promedioActives * 100) + "%",
        "Inactivos " + Math.round(this.state.promedioInactives * 100) + "%",
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
    return (
      <div>
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
      </div>
    );
  }
}

export default Advisers;
