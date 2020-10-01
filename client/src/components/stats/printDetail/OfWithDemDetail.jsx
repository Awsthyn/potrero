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
  
  
  async transformar(){
    let subjD = [];
    for (let i = 0; i < this.state.demand.length; i++) {
      for (const property in this.state.demand[i]) {
        subjD.push(property)
      }
    }
    this.setState({
      listaDemanda: subjD,
    })
    }


  async componentDidMount() {
    await this.peticion();
    await this.transformar();
  }

  render() {

    let testeando = {
      testing: [],
      claramente: [],
      probando: [],
    }

    this.state.demand.forEach( demandante => {
      this.state.listaDemanda.forEach( element => {
        if(demandante[element]){
          testeando.claramente.push({[element] : demandante[element]})
          testeando.probando.push(element)
            testeando.testing = testeando.testing.concat(demandante[element])
          }
        })
     })
     let recorrer = [];
    return (
      <div className="detailAssist">
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
        
       { 
       this.state.demand.length > 0 ?
        (<div>

        
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
           {
             
             testeando.claramente.map( ola => {
               for (const key in ola) {
                 if (ola.hasOwnProperty(key)) {
                   const element = ola[key];
                   element.map( cadaDemandador => {
                    recorrer.push(cadaDemandador)
                  })

                  return (<tr>
                <th scope="row">Demanda</th>
                <td>{key}</td>
                <td>Franco</td>
                <td>Matus</td>
                </tr>)
                 }
               }
          })
        }

        </tbody>
        </table>
        </div>)
      : (
        <div>
          <h3>No hay materias disponibles.</h3>
        </div>
      )  
      } 
      </div>
    );
  }
}
export default OfWithDemDetail;
