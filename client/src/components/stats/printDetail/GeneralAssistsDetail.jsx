import React, { useState, useEffect } from "react";
import "./detail.css";
import GeneralAssists from "../GeneralAssists.jsx";

class GeneralAssistDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      presente: [],
      noJustificada: [],
      justificada: [],
      tardanzas: [],
    };
    this.armarDatos = this.armarDatos.bind(this);
    this.imprimir = this.imprimir.bind(this);
  }

  componentDidMount() {
    this.setState({ info: this.props.location.infoGrafico });
  }

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
    });
  }

  imprimir() {
    let input = window.document.getElementById("graficas");
    document.getElementsByClassName("MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters")[0].style.visibility =
      "hidden";
    document.getElementsByClassName("titlePotrero oculto")[0].style.visibility =
        "visible";
    window.print(input);
    document.getElementsByClassName("MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters")[0].style.visibility =
      "visible";
      document.getElementsByClassName("titlePotrero oculto")[0].style.visibility =
        "hidden";
  }

  render() {
    return (
      <div className="printDetail">
      <div className={`titlePotrero oculto`}>
        <h1>Fundación El Potrero</h1>
        <img
        src="https://static.wixstatic.com/media/a54840_a2385331f0da4e698b63580c4db7ef02%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a54840_a2385331f0da4e698b63580c4db7ef02%7Emv2.png" />
      </div>
      <button onClick={this.imprimir} className="btn btn-primary ocultoimpresion">
        Imprimir
      </button>
        {this.state.info && this.armarDatos()}
        <br />
        <br />
        <br />
        <GeneralAssists />
        <br />
        <br />
        <br />
        <h1>Asistencia</h1>
        <table class="table">
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
