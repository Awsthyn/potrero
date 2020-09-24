import { useSelector, useDispatch } from "react-redux";
import { Pie, Line, Bar } from "react-chartjs-2";
import * as actions from "../../redux/actions/stats.js";
import React from "react";

class Offers extends React.Component {
  state = {
    notas: [],
  };
  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/qualification");
    var notas = await peticion.json();

    let pro = notas.length > 0 ? notas.reduce((acc, currValue) => acc + currValue) : 0;

    this.setState({
      notas: notas,
      total: Math.round(pro / notas.length)
    });
  }

  getChartData() {
    let not = this.state.notas;
    let promedio = 0;
    let minimo = Math.min.apply(null, not);
    let maximo = Math.max.apply(null, not);

    for (let i = 0; i < not.length; i++) {
      promedio = promedio + not[i];
      if (!(i + 1 < not.length)) {
        // Instrucciones de la ultima iteración
        promedio = promedio / not.length;
      }
    }

    const datos = {
      //hacer map para labels
      labels: ["Menor nota", "Promedio", "Mayor nota"],
      datasets: [
        {
          label: "Notas",
          data: [Math.round(minimo), Math.round(promedio), Math.round(maximo)],
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
        {
          isNaN(this.state.total) ? <h3>Promedio notas: No existen notas</h3>
          : <h3>"Promedio notas: " {this.state.total}</h3>
        }

        <Bar
          type
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              yAxes: [{
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 10
                  }
              }]
          }
          }}
        ></Bar>
      </div>
    );
  }
}

export default Offers;