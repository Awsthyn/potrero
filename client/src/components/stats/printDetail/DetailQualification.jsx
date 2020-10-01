import React, { useEffect, useState } from "react";
import Advisers from "../Advisers";
import Calificacion from "../Quafilications.jsx";
import "./detail.css";

class DetailQualification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: [],
      nota: [],
      materias: [],
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({
      nombre: this.props.location.nombres,
      nota: this.props.location.notas,
      materias: this.props.location.materias,
    });
  }
  render() {
    return (
      <div className="detailAssist">
        <br />
        <br />
        <br />
        <div className={`titlePotrero row d-flex justify-content-center`}>
          <h1>Fundación El Potrero</h1>
          <img src="https://static.wixstatic.com/media/a54840_a2385331f0da4e698b63580c4db7ef02%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a54840_a2385331f0da4e698b63580c4db7ef02%7Emv2.png" />
        </div>
        <button
          onClick={() => window.print()}
          className="btn btn-primary ocultoimpresion"
        >
          Imprimir
        </button>
        <Calificacion />
        <h1>Detalles calificaciones</h1>
        <table className="table ">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Materia</th>
              <th scope="col">Nombre</th>
              <th scope="col">Nota</th>
            </tr>
          </thead>
          <tbody>
            <th>
              {this.state.materias &&
                this.state.materias.map((e) => <tr>{e}</tr>)}
            </th>
            <th>
              {this.state.nombre && this.state.nombre.map((e) => <tr>{e}</tr>)}
            </th>
            <th>
              {this.state.nota && this.state.nota.map((e) => <tr>{e}</tr>)}
            </th>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DetailQualification;
