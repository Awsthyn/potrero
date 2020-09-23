import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Line, Pie, Doughnut} from "react-chartjs-2";
import * as actions from "../../redux/actions/stats.js";

class StatusVoluntary extends React.Component {
  state = {
    totalAdvisors: 0,
    totalAdvisorsActives: 0,
    totalAdvisorsInactives: 0,
    promedioActives: 0,
    promedioInactives: 0,
  };
  
  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/advisorstatus");
    var respuesta = await peticion.json();
    this.setState({
      totalAdvisors: respuesta.totalAdvisors,
      totalAdvisorsActives: respuesta.totalAdvisorsActives,
      totalAdvisorsInactives: respuesta.totalAdvisorsInactives,
    });
    
    this.state.promedioActives = this.state.totalAdvisorsActives / this.state.totalAdvisors;
    this.state.promedioInactives =  this.state.totalAdvisorsInactives / this.state.totalAdvisors;
  }

  getChartData() {
    const datos = {
      labels: ["Activos " + this.state.promedioActives * 100 + "%", "Inactivos " + this.state.promedioInactives * 100 + "%"],
      datasets: [
        {
          label: "Asesores",
          data: [
            this.state.totalAdvisorsActives,
            this.state.totalAdvisorsInactives
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
        <Doughnut
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        ></Doughnut>
      </div>
    );
  }
}

export default StatusVoluntary;
