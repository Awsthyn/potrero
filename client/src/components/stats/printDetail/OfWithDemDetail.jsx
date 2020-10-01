import React, { useState, useEffect } from "react";
import "./detail.css";
import OffersWithDemand from "../OffersWithDemand";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

//
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
    console.log(this.props.location);
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
        {console.log(this.state)}
        <br></br>
        <br>
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
        <br />
        <br />
        <br />
        <OffersWithDemand />
        <br />
        <br />
        <br />

        {/* {this.state.demand.length > 0 ? (
          <div>
            <h1>Demanda de materias</h1>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Estado</th>
                  <th scope="col">Materias</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h3>No hay materias disponibles.</h3>
          </div>
        )} */}
      </div>
    );
  }
}
export default OfWithDemDetail;
