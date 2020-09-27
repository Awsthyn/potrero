import React from "react";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import GenAsDet from "./printDetail/GeneralAssistsDetail.jsx";
import "./printDetail/detail.css";

class generalAssists extends React.Component {
  state = {
    respuesta: [],
    dataAssistance: [],
    dataNoJustificada: [],
    dataJustificada: [],
    dataDelay: [],
    datos: [],
    opciones: [],
    total: 0,
    promedioJustificadas: 0,
    promedioInjustificadas: 0,
    promedioAsistencias: 0,
    promedioTardanzas: 0,
  };

  async peticion() {
    let peticion = await fetch("http://localhost:3001/stats/assistances");
    let respuesta = await peticion.json();
    
    let dataAssistance = [];
    let dataNoJustificada = [];
    let dataJustificada = [];
    let dataDelay = [];
    this.setState({
      respuesta: respuesta,
      info: respuesta.info,
    });

    dataJustificada.push(respuesta.haveJustify);
    dataNoJustificada.push(respuesta.noJustify);
    dataAssistance.push(respuesta.assistance);
    dataDelay.push(respuesta.delay);

    this.setState({
      respuesta: respuesta,
      dataAssistance: dataAssistance,
      dataJustificada: respuesta.haveJustify,
      dataNoJustificada: respuesta.noJustify,
      dataDelay: dataDelay,
      total: respuesta.total,
    });

    this.state.promedioAsistencias =
      this.state.dataAssistance / this.state.total;

    this.state.promedioInjustificadas =
      this.state.dataNoJustificada / this.state.total;

    this.state.promedioJustificadas =
      this.state.dataJustificada / this.state.total;

    this.state.promedioTardanzas = this.state.dataDelay / this.state.total;
  }

  getChartData() {
    const datos = {
      labels: [
        "Asistencias " +
          this.state.dataAssistance +
          " (" +
          Math.round(this.state.promedioAsistencias * 100) +
          "%" +
          ")",
        "Faltas justificadas " +
          this.state.dataJustificada +
          " (" +
          Math.round(this.state.promedioJustificadas * 100) +
          "%" +
          ")",
        "Faltas injustificadas " +
          this.state.dataNoJustificada +
          " (" +
          Math.round(this.state.promedioInjustificadas * 100) +
          "%" +
          ")",
        "Tardanzas " +
          this.state.dataDelay +
          " (" +
          Math.round(this.state.promedioTardanzas * 100) +
          "%" +
          ")",
      ],
      datasets: [
        {
          label: "Asistencias totales",
          data: [
            this.state.respuesta.assistance,
            this.state.respuesta.haveJustify,
            this.state.respuesta.noJustify,
            this.state.respuesta.delay,
          ],
          backgroundColor: [
            "rgba(73, 43, 196, 0.6)",
            "rgba(71, 165, 214, 0.6)",
            "rgba(166, 40, 40, 0.6)",
            "rgba(140, 198, 62, 0.6)",
          ],
        },
      ],
    };

    const opciones = {
      responsive: true,
      maintainAspectRatio: true,
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
    const enviarDetalles = {
      pathname: "/admin/detail",
      infoGrafico: this.state.info,
    };
    return (
      <div>
        <h4>{"Asistencias generales: " + this.state.total}</h4>
        <Pie
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
        ></Pie>
        <Link to={enviarDetalles}><button className="btn btn-primary">Enviame</button></Link>
      </div>
    );
  }
}

export default generalAssists;
