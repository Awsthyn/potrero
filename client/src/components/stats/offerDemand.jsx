import { useSelector, useDispatch } from "react-redux";
import { Pie, Line, Bar } from "react-chartjs-2";
import * as actions from "../../redux/actions/stats.js";
import React from "react";

class Offers extends React.Component {
  state = {};

  async peticion() {
    let peticionOferta = await fetch(
      "http://localhost:3001/stats/offer/subject"
    );
    let ofertas = await peticionOferta.json();

    let peticionDemanda = await fetch(
      "http://localhost:3001/stats/demand/subject"
    );
    let demandas = await peticionDemanda.json();

    this.setState({
      ofertas,
      demandas,
    });

    console.log(this.state);
    // this.setState({
    //   allDemands: demandas.onlyDemand,
    //   totalDemands: demandas.demandSubjects,
    //   allOffers: ofertas.onlyDemandOffert,
    //   totalOffers: ofertas.offertSubjects,
    // });
  }

  getChartData() {
    console.log(this.state);
    let demandasMat = this.state.demandas.nameSubjectsDemand;
    let countDemandasMat = this.state.demandas.demandSubjects;
    let ofertasMat = this.state.ofertas.nameSubjectsOffert;
    let countOfertasMat = this.state.ofertas.offertSubjects;
    let demandsOffers = [];
    let ordenDemandsOffers = [];
    // demandasMat.forEach((e) => {
    //   demandsOffers.push(e);
    // });

    // ofertasMat.forEach((e) => {
    //   demandsOffers.push(e);
    // });

    demandasMat.forEach((prim) => {
      ofertasMat.forEach((seg) => {
        if (prim.id === seg.id) {
          if (!ordenDemandsOffers.hasOwnProperty(prim)) {
            ordenDemandsOffers.push(prim);
          }
          if (!ordenDemandsOffers.hasOwnProperty(seg)) {
            ordenDemandsOffers.push(seg);
          }
        }
      });
    });

    demandasMat.forEach((prim) => {
      ofertasMat.forEach((seg) => {
        if (!ordenDemandsOffers.hasOwnProperty(prim)) {
          ordenDemandsOffers.push(prim);
        }
        if (!ordenDemandsOffers.hasOwnProperty(seg)) {
          ordenDemandsOffers.push(seg);
        }
      });
    });

    console.log(ordenDemandsOffers);

    // let allDemandsMat = this.state.allDemands;
    // let allOffersMat = this.state.allOffers;
    // let materias = [];
    // console.log(this.state);
    // // allDemandsMat.forEach(e => {
    // //     materias.push(e)
    // // });

    // // allOffersMat.forEach(e => {
    // //     materias.push(e)
    // // });

    // const demOffer = [];
    // allDemandsMat.forEach((e) => {
    //   let nombre = Object.keys(e);
    //   materias.push(nombre[0]);
    // });

    // allOffersMat.forEach((e) => {
    //   let nombre = Object.keys(e);
    //   materias.push(nombre[0]);
    // });
    // console.log(materias);
    // let asd = new Set(materias);
    // console.log(asd);

    const datos = {
      //hacer map para labels
      labels: 0,
      datasets: [
        {
          label: "Demandas de materias",
          data: 10,
          fill: false,
          backgroundColor: [
            "rgba(73, 43, 196, 0.6)",
            "rgba(140, 198, 62, 0.6)",
            "rgba(71, 165, 214, 0.6)",
            "rgba(73, 43, 196, 0.6)",
            "rgba(140, 198, 62, 0.6)",
            "rgba(71, 165, 214, 0.6)",
            "rgba(73, 43, 196, 0.6)",
            "rgba(140, 198, 62, 0.6)",
            "rgba(71, 165, 214, 0.6)",
          ],
        },
      ],
    };
    const opciones = {
      responsive: true,
      maintainAspectRatio: false,
      displayTitle: true,
      displayLegend: true,
      legendPosition: "bottom",
    };
    this.setState({
      datos: datos,
      opciones: opciones,
    });
  }

  async componentDidMount() {
    await this.peticion();
    await this.getChartData();
  }

  render() {
    return (
      <div>
        <h3>{"Ofertas de materias: " + this.state.total}</h3>
        <Bar
          type
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        ></Bar>
      </div>
    );
  }
}

export default Offers;
