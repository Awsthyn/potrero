import React, { useState, useEffect } from "react";
import "./detail.css";
import GeneralAssists from "../GeneralAssists.jsx";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

//
class GeneralAssistDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      presente: [],
      noJustificada: [],
      justificada: [],
      tardanzas: [],
      fecha: [],
    };
    this.armarDatos = this.armarDatos.bind(this);
    this.isoFormatDMY = this.isoFormatDMY.bind(this);
    this.parseISOString = this.parseISOString.bind(this);
  }

  componentDidMount() {
    this.setState({ info: this.props.location.infoGrafico });
  }


  //Intento de parsear fecha rara a date
  isoFormatDMY(d) {
    function pad(n) {
      return (n < 10 ? "0" : "") + n;
    }
    return (
      pad(d.getUTCDate()) +
      "/" +
      pad(d.getUTCMonth() + 1) +
      "/" +
      d.getUTCFullYear()
    );
  }

  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  //Cierro intento

  armarDatos() {
    this.state.info.forEach((element) => {
      if (element.assistance === "presente") {
        this.state.presente.push(
          element.class.student.firstName + " " + element.class.student.lastName
        );
      } else if (element.assistance === "no justificada") {
        this.state.noJustificada.push(
          element.class.student.firstName + " " + element.class.student.lastName
        );
      } else if (element.assistance === "justificada") {
        this.state.justificada.push(
          element.class.student.firstName + " " + element.class.student.lastName
        );
      } else if (element.assistance === "tardanza") {
        this.state.tardanzas.push(
          element.class.student.firstName + " " + element.class.student.lastName
        );
       
      }

      if (element.createdAt) {
        var s = element.createdAt;
        var date = this.parseISOString(s);

        this.state.fecha.push(date);
      }

    });
  }

  render() {
    return (
      <div className="detailAssist">
        {console.log(this.state.info)}
        <br />
        <br />
        <br />
        <div
          className={`titlePotrero ocultoimpresion row d-flex justify-content-center`}
        >
          <h1>Fundación El Potrero</h1>
          <img src="https://static.wixstatic.com/media/a54840_a2385331f0da4e698b63580c4db7ef02%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a54840_a2385331f0da4e698b63580c4db7ef02%7Emv2.png" />
        </div>
        <button
          onClick={() => window.print()}
          className="btn btn-primary ocultoimpresion"
        >
          Imprimir
        </button>
        {this.state.info && this.armarDatos()}
        <GeneralAssists />
        <h1>Asistencia</h1>
        <table className="table ">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Asistencia</th>
              <th scope="col">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {this.state.presente &&
              this.state.presente.map((e) => (
                <tr>
                  <th scope="row">Presente</th>
                  <td>{e}</td>
                </tr>
              ))}
          </tbody>
          <tbody>
            {this.state.noJustificada &&
              this.state.noJustificada.map((e) => (
                <tr>
                  <th scope="row">Falta no justificada</th>
                  <td>{e}</td>
                </tr>
              ))}
          </tbody>
          <tbody>
            {this.state.justificada &&
              this.state.justificada.map((e) => (
                <tr>
                  <th scope="row">Falta justificada</th>
                  <td>{e}</td>
                </tr>
              ))}
          </tbody>
          <tbody>
            {this.state.tardanzas &&
              this.state.tardanzas.map((e) => (
                <tr>
                  <th scope="row">Tardanzas</th>
                  <td>{e}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default GeneralAssistDetail;
