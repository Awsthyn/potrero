import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import * as actions from "../../redux/actions/stats.js";

class NoteGrafic extends React.Component {
  state = {
    respuesta: [],
    dataAssistance: [],
    dataInassistance: [],
    dataDelay: [],
    datos: [],
    opciones: [],
  };

  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/qualification");
    var respuesta = await peticion.json();
    console.log("respuesta", respuesta);
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
    });
    // console.log("Soy dataAssistance",this.state.dataAssistance)
    // console.log("Soy dataInassistance",this.state.dataInassistance)
    // console.log("Soy delay",this.state.dataDelay)
  }

  getChartData() {
    console.log(this.state);
    var arreglo = [];
    this.state.respuesta.map(elem => {
      arreglo.push(elem)
    })


    const datos = {
      labels: arreglo,
      datasets: [
        {
          label: "Meses totales",
          data: this.state.respuesta
          ,
          fill: true,
          backgroundColor: "rgba(54, 162 , 235, 0.6)",
          borderColor: "rgba(54, 162 , 235, 0.6)",
          pointBorderColor: "rgba(54, 162 , 235, 0.6)",
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
        <Line
          type
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        ></Line>
      </div>
    );
  }
}

export default NoteGrafic;
