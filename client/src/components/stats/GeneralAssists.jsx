import React from "react";
import { Pie } from "react-chartjs-2";

class generalAssists extends React.Component {
  state = {
    respuesta: [],
    dataAssistance: [],
    dataInassistance: [],
    dataDelay: [],
    datos: [],
    opciones: [],
    total: 0,
    promedioAsistencias: 0,
    promedioInasistencias: 0,
    promedioTardanzas: 0,
  };

  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/assistances");
    var respuesta = await peticion.json();
    var dataAssistance = [];
    var dataInassistance = [];
    var dataDelay = [];
    this.setState({
      respuesta: respuesta,
    });
    
    dataAssistance.push(respuesta.assistance);
    dataInassistance.push(respuesta.inassistance);
    dataDelay.push(respuesta.delay);

    this.setState({
      respuesta: respuesta,
      dataAssistance: dataAssistance,
      dataInassistance: dataInassistance,
      dataDelay: dataDelay,
      total: respuesta.total,
    });
  
    this.state.promedioAsistencias = this.state.dataAssistance / this.state.total;
    this.state.promedioInasistencias = this.state.dataInassistance / this.state.total;
    this.state.promedioTardanzas = this.state.dataDelay / this.state.total;
  }

  getChartData() {
    const datos = {
      labels: ["Asistencias " + this.state.dataAssistance + " (" + Math.round(this.state.promedioAsistencias * 100) + "%" + ")", "Inasistencias " + this.state.dataInassistance + " (" + Math.round(this.state.promedioInasistencias * 100) + "%" + ")", "Tardanzas " + this.state.dataDelay + " (" + Math.round(this.state.dataDelay) + "%" + ")"],
      datasets: [
        {
          label: "Asistencias totales",
          data: [
            this.state.respuesta.assistance,
            this.state.respuesta.inassistance,
            this.state.respuesta.delay,
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
      maintainAspectRatio: true,
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
        <h4>{"Asistencias generales: " + this.state.total}</h4>
        <Pie
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        ></Pie>
      </div>
    );
  }
}

export default generalAssists;
