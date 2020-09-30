import React, { useState, useEffect } from "react";
import "./detail.css";
import GeneralAssists from "../GeneralAssists.jsx";
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

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
    };
    this.armarDatos = this.armarDatos.bind(this);
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

  render() {
    return (
      <div className="detailAssist">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className={`titlePotrero ocultoimpresion row d-flex justify-content-center`}>
       <h1>Fundación El Potrero</h1>
     </div>
      <button onClick={()=>window.print()} className="btn btn-primary ocultoimpresion">
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
