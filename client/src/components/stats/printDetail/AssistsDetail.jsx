import React, { useState, useEffect } from "react";
import "./detail.css";
import GeneralAssists from "../GeneralAssists.jsx";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import logo from '../../admin/assets/logo.png'

class GeneralAssistDetail extends React.Component {
  //Recibe los valores por props
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
  //Seteamos props
  componentDidMount() {
    this.setState({ info: this.props.location.infoGrafico });
  }

  //Estas dos funciones sirven para parsear el formato de date que tenemos en la db
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

  armarDatos() {
    this.state.info.forEach((element) => {
      if (element.assistance === "presente") {
        //Usamos las funciones de parseo
        let s = element.createdAt;
        let date = this.parseISOString(s);
        let converter1 = this.isoFormatDMY(date);

        this.state.presente.push({
          presente:
            element.class.student.firstName +
            " " +
            element.class.student.lastName,
          fecha: converter1,
        });
      } else if (element.assistance === "no justificada") {
        let s = element.createdAt;
        let date = this.parseISOString(s);
        let converter2 = this.isoFormatDMY(date);

        this.state.noJustificada.push({
          noJustificada:
            element.class.student.firstName +
            " " +
            element.class.student.lastName,
          fecha: converter2,
        });
      } else if (element.assistance === "justificada") {
        let s = element.createdAt;
        let date = this.parseISOString(s);
        let converter3 = this.isoFormatDMY(date);

        this.state.justificada.push({
          justificada:
            element.class.student.firstName +
            " " +
            element.class.student.lastName,
          fecha: converter3,
        });
      } else if (element.assistance === "tardanza") {
        let s = element.createdAt;
        let date = this.parseISOString(s);
        let converter4 = this.isoFormatDMY(date);

        this.state.tardanzas.push({
          tardanza:
            element.class.student.firstName +
            " " +
            element.class.student.lastName,
          fecha: converter4,
        });
      }
    });
  }

  render() {
    //Renderizamos otod lo preparado mediante tables 
    return (
      <div className="detailAssist">
        <br />
        <br />
        <br />
        <div
          className={`titlePotrero row justify-content-center`}
        >
          <h1>Fundación El Potrero</h1>
          <img src={logo} />
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
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {this.state.presente &&
              this.state.presente.map((e) => (
                <tr>
                  <th scope="row">Presente</th>
                  <td>{e.presente}</td>
                  <td>{e.fecha}</td>
                </tr>
              ))}
          </tbody>
          <tbody>
            {this.state.noJustificada &&
              this.state.noJustificada.map((e) => (
                <tr>
                  <th scope="row">Falta no justificada</th>
                  <td>{e.noJustificada}</td>
                  <td>{e.fecha}</td>
                </tr>
              ))}
          </tbody>
          <tbody>
            {this.state.justificada &&
              this.state.justificada.map((e) => (
                <tr>
                  <th scope="row">Falta justificada</th>
                  <td>{e.justificada}</td>
                  <td>{e.fecha}</td>
                </tr>
              ))}
          </tbody>
          <tbody>
            {this.state.tardanzas &&
              this.state.tardanzas.map((e) => (
                <tr>
                  <th scope="row">Tardanzas</th>
                  <td>{e.tardanza}</td>
                  <td>{e.fecha}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default GeneralAssistDetail;

//Estos cuatros archivos tienen la misma estructura de dom así se usa más facil el css.
