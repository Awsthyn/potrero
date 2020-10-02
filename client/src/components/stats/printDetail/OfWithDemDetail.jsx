import React, { useState, useEffect } from "react";
import "./detail.css";
import OffersWithDemand from "../OffersWithDemand";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import logo from "../../admin/assets/logo.png";

class OfWithDemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaDemanda: [],
      listaOferta: [],
      demand: [],
      offers: [],
      demandantes: [],
    };
  }

  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/demandwithoffer");
    var respuesta = await peticion.json();
    this.setState({
      demand: respuesta.allDemands,
      offers: respuesta.allOffer,
    });
  }

  async transformar() {
    let materiasDemanda = [];
    let materiasOferta = [];

    for (let i = 0; i < this.state.demand.length; i++) {
      for (const property in this.state.demand[i]) {
        materiasDemanda.push(property);
      }
    }

    for (let i = 0; i < this.state.offers.length; i++) {
      for (const property in this.state.offers[i]) {
        materiasOferta.push(property);
      }
    }

    this.setState({
      listaDemanda: materiasDemanda,
      listaOferta: materiasOferta,
    });
  }

  async componentDidMount() {
    await this.peticion();
    await this.transformar();
    this.setState({
      demand: this.props.location.demandas,
      offers: this.props.location.ofertas,
    });
  }

  render() {
    let testeando = {
      testing: [],
      claramente: [],
      probando: [],
    };
    if (this.state.demand) {
      this.state.demand.forEach((demandante) => {
        this.state.listaDemanda.forEach((element) => {
          if (demandante[element]) {
            testeando.claramente.push({ [element]: demandante[element] });
            testeando.probando.push(element);
            testeando.testing = testeando.testing.concat(demandante[element]);
          }
        });
      });
    }
    let recorrer = [];
    return (
      <div className="detailAssist">
        <br />
        <br />
        <br />
        <div
          className={`titlePotrero ocultoimpresion row d-flex justify-content-center`}
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
        <OffersWithDemand />
        <h1>Demanda de materias</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">Materias</th>
            </tr>
          </thead>
          <tbody>
            {this.state.listaDemanda &&
              this.state.listaDemanda.map((e) => (
                <tr>
                  <th scope="row">Demanda</th>
                  <td>{e}</td>
                </tr>
              ))}
            {this.state.listaOferta &&
              this.state.listaOferta.map((e) => (
                <tr>
                  <th scope="row">Oferta</th>
                  <td>{e}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default OfWithDemDetail;

{
  /* <tbody>
{testeando.claramente.map((ola) => {
  for (const key in ola) {
    if (ola.hasOwnProperty(key)) {
      const element = ola[key];
      element.map((cadaDemandador) => {
        recorrer.push(cadaDemandador);
      });

      return (
        <tr>
          <th scope="row">Demanda</th>
          <td>{key}</td>
          <td>Franco</td>
          <td>Matus</td>
        </tr>
      );
    }
  }
})}
</tbody> */
}
