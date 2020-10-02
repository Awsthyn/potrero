import React, { useEffect, useState } from "react";
import Advisers from "../Advisers";
import axios from "axios";
import "./detail.css";
import logo from '../../admin/assets/logo.png'

class DetalleAsesores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advisors: {},
      info: {},
    };
  }

  componentDidMount() {
    this.setState({
      actives: this.props.location.probandoAdvisor.total.advisorsActives,
      inactives: this.props.location.probandoAdvisor.total.advisorsInactives,
    });
  }
  render() {
    return (
      <div className="detailAssist">
        <br />
        <br />
        <br />
        <div
          className={`titlePotrero row d-flex justify-content-center`}
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

        <Advisers />
        <h1>Detalles asesores</h1>
        <table className="table ">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {this.state.actives &&
              this.state.actives.map((e) => (
                <tr>
                  <th scope="row">Activo</th>
                  <td>{e.nombre}</td>
                </tr>
              ))}
          </tbody>
          <tbody>
            {this.state.inactives &&
              this.state.inactives.map((e) => (
                <tr>
                  <th scope="row">Inactivo</th>
                  <td>{e.nombre}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DetalleAsesores;
