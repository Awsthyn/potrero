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
      offers: []
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
    for (let i = 0; i < this.state.demand.length; i++) {
      for (const property in this.state.demand[i]) {
        this.state.listaDemanda.push(this.state.demand[i][property]);
      }
    }
    }

  async conversor(arg){
    let sum = [];
    let totalConversions = [];
    for (let j = 0; j < arg.length; j++) {

      if(Array.isArray(arg[j])) sum.push(this.conversor(arg[j]))
      else sum.push(arg[j])
      
    }
    Promise.all(sum)
    .then( respuesta => {
      console.log(respuesta)
    })
    .catch(err => {
      console.log(err)
    })
    // return totalConversions;
  }

  async componentDidMount() {
    await this.peticion();
    await this.transformar();
    let result = await this.conversor(this.state.listaDemanda);
    console.log(result)
  }

  render() {
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
        <h1>Demandas y ofertas de materias</h1>
       { 
        (<table className="table ">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Oferta/Demanda</th>
              <th scope="col">Materia</th>
            </tr>
          </thead>
          <tbody>
           { this.state.listaDemanda &&
           this.state.listaDemanda.forEach( element => {
            element.map(e => {
              console.log("Estoy en demanda ", e)
             return <tr>
              {console.log(e)}
                 <th scope="row">Demanda</th>
                <td>{e}</td>
               </tr>
            }) 
          })
          }
          </tbody>
          <tbody>
            {/* {this.state.offers &&
              this.state.offers.map((e) => {
               return <tr>
                  <th scope="row">Oferta</th>
                  <td>{e}</td>
                </tr>
              })} */}
          </tbody>
        </table>)
        //  (
        //   <div>
        //     <h1>No hay demandas ni ofertas de materias.</h1>
        //   </div>
        // )
        } 
      </div>
    );
  }
}
export default OfWithDemDetail;
