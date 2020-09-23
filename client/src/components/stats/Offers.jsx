import { useSelector, useDispatch } from "react-redux";
import { Pie, Line, Bar } from "react-chartjs-2";
import * as actions from "../../redux/actions/stats.js";
import React from "react";

class Offers extends React.Component {
  state = {
    datos: [],
    opciones: [],
  };

  async peticion() {
    
    var peticion = await fetch("http://localhost:3001/stats/offer/subject");
    var ofertas = await peticion.json();
      console.log("soy ofertas", ofertas);
    var dataAssistance = [];
    var dataInassistance = [];
    var dataDelay = [];
    this.setState({
      offers: ofertas.onlyDemandOffert,
    });
  }

  getChartData() {
    console.log("State offers", this.state);
    const demOffer = [];
    this.state.offers.forEach(e => {
       let nombre = Object.keys(e)
       demOffer.push(nombre[0])
    })

    const countdemOffer = []
    for(let i= 0; i < this.state.offers.length; i++){
        for (const property in this.state.offers[i]) {
          //console.log(property);
          countdemOffer.push(this.state.offers[i][property])
        }
      } 
      console.log(countdemOffer);

    const datos = {
      //hacer map para labels
      labels: demOffer,
      datasets: [
        {
          label: "Demandas de materias",
          data: countdemOffer,
          fill: false,
          backgroundColor: [
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
        <Bar
          type
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        ></Bar>
      </div>
    );
  }
}

export default Offers;
