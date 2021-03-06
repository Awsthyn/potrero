import React from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "./style.css";

class Offers extends React.Component {
  state = {
    notas: [],
    nombres: [],
    materias: [],
  };
  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/qualification");
    var notas = await peticion.json();
    let notaspro = [];
    let nombrespro = [];
    let materiaspro = [];
    let suma = 0;

    notas.map((e) => {
      notaspro.push(e.nota);
      nombrespro.push(e.fullname);
      materiaspro.push(e.materia);
    });
    
    this.setState({
      notas: notaspro,
      nombres: nombrespro,
      materias: materiaspro,
      
    });

    let pro =
    this.state.notas.length > 0
    ? this.state.notas.map(e => (
      suma = suma + e
    ))
    : 0;
    this.setState({
      total: Math.round(suma / this.state.notas.length),
    })
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
      labels: ["Menor nota", "Mayor nota", "Promedio"],
      datasets: [
        {
          label: "Notas",
          data: [Math.round(minimo), Math.round(maximo), Math.round(promedio)],
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
    const enviarDetalles = {
      pathname: "/admin/detalle/calificacion",
      nombres: this.state.nombres,
      notas: this.state.notas,
      materias: this.state.materias,
    };

    return (
      <div className="genAsist">
        {isNaN(this.state.total) ? (
          <h4>Promedio notas: No existen notas</h4>
        ) : (
          <h4>Promedio notas: {this.state.total}</h4>
        )}

        <Bar
          type
          data={this.state.datos}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontColor: "black",
                fontSize: 15,
              },
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(0, 0, 0, 1)",
                    fontSize: 15,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    suggestedMin: 0,
                    stepSize: 2,
                    fontColor: "rgba(0, 0, 0, 1)",
                    fontSize: 15,
                  },
                },
              ],
            },
          }}
        ></Bar>
        <Link to={enviarDetalles}>
          <button className="btn btn-primary ocultoimpresion">
            Ver detalles
          </button>
        </Link>
      </div>
    );
  }
}

export default Offers;
