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
    };
    this.armarDatos = this.armarDatos.bind(this);
  }

  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/demandwithoffer");
    var respuesta = await peticion.json();
    this.setState({
      demand: respuesta.allDemands,
      offers: respuesta.allOffer,
    });
    // console.log(this.state);
  }

  armarDatos() {
    this.state.demand.forEach((element) => {
      for (var key in element) {
        this.state.listaDemanda.push(key);
      }
    });

    this.state.offers.forEach((element) => {
      for (var key in element) {
        this.state.listaOferta.push(key);
      }
    });
  }

  async componentDidMount() {
    await this.peticion();
    await this.armarDatos();
  }

  render() {
    return (
      <div className="detailAssist">
        {/* {console.log(this.state)} */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div
          className={`titlePotrero ocultoimpresion row d-flex justify-content-center`}
        >
          <h1>Fundación El Potrero</h1>
        </div>
        <button
          onClick={() => window.print()}
          className="btn btn-primary ocultoimpresion"
        >
          Imprimir
        </button>
        {this.state.info && this.armarDatos()}
        <br />
        <br />
        <br />
        <OffersWithDemand />
        <br />
        <br />
        <br />
        <h1>Demandas y ofertas de materias</h1>
        <table className="table ">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Oferta/Demanda</th>
              <th scope="col">Materia</th>
            </tr>
          </thead>
          <tbody>
              {/* {console.log(typeof this.state.listaDemanda)} */}
            {
              

            // this.state.listaDemanda.map(e =>
            //   console.log({e})
            //   // <tr>
            //   // {console.log(e)}
            //   //       <th scope="row">Demanda</th>
            //   //       <td>{e}</td>
            //   //     </tr>
            // )
            }
          </tbody>
          <tbody>
            {this.state.listaOferta &&
              this.state.listaOferta.map((e) => (
                <tr>
                  <th scope="row">Oferta</th>
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
export default OfWithDemDetail;
