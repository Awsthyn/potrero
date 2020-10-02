import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import DetalleAsesores from "./printDetail/DetalleAsesores";
import "./style.css";

class Advisers extends React.Component {
  state = {
    info: [],
    totalAdvisors: 0,
    totalAdvisorsActives: 0,
    totalAdvisorsInactives: 0,
    promedioActives: 0,
    promedioInactives: 0,
    total: []
  };

  async peticion() {
    var peticion = await fetch("http://localhost:3001/stats/advisorstatus");
    var respuesta = await peticion.json();

    let advisorsTemp = [];

    advisorsTemp = respuesta.advisorsActives;
    //Pusheamos los asesores a ese let
    respuesta.advisorsInactives.forEach((advisorsTotal) => {
      advisorsTemp.push(advisorsTotal);
    });

    this.setState({
      total: respuesta,
      info: advisorsTemp,
      totalAdvisors: respuesta.totalAdvisors,
      totalAdvisorsActives: respuesta.totalAdvisorsActives,
      totalAdvisorsInactives: respuesta.totalAdvisorsInactives,
    });
    //Hacemos el calculo de promedios activos e inactivos
    this.state.promedioActives =
      this.state.totalAdvisorsActives / this.state.totalAdvisors;
    this.state.promedioInactives =
      this.state.totalAdvisorsInactives / this.state.totalAdvisors;
  }

  getChartData() {
    //Se configuran los datos
    const datos = {
      //Labels va la descripción de los campos por cada , vas agregando mas colores a la gráfica, asegurate de que los colores no sean estaticos, si no que se repliquen por cada cantidad de label que vas a mostrar
      labels: [
        "Activos " +
          (this.state.promedioActives > 0
            ? Math.round(this.state.promedioActives * 100) + "%"
            : ""),
        "Inactivos " +
          (this.state.promedioInactives > 0
            ? Math.round(this.state.promedioInactives * 100) + "%"
            : ""),
      ],
      datasets: [
        {
          //Titulo del label
          label: "Asesores",
          //Este campo muestra los datos en la gráfica 
          data: [
            this.state.totalAdvisorsActives,
            this.state.totalAdvisorsInactives,
          ],
          backgroundColor: [
            "rgba(73, 43, 196, 0.6)",
            "rgba(140, 198, 62, 0.6)",
            "rgba(71, 165, 214, 0.6)",
          ],
        },
      ],
    };

    //Se configuran las opciones
    const opciones = {
      responsive: true,
      maintainAspectRatio: false,
      displayTitle: true,
      displayLegend: true,
      legendPosition: "bottom",
      location: "Asistencias totales",
      legend: {
        labels: {
          fontColor: "black",
          fontSize: 15,
        },
      },
    };
    //Seteamos datos y opciones
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
    //Preparamos un objeto con la ruta de dirección y su contenido asi lo pasamos por params
    const EnviarDetallesAsistentes = {
      pathname: "/admin/detalle/asesores",
      probandoAdvisor: this.state,
    };
    return (
      <div className="genAsist">
        <h4>{"Asesores: " + this.state.totalAdvisors}</h4>
        <Doughnut
        //Renderizamos los datos guardados
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
          }}
        ></Doughnut>
        {/* Mediante to enviamos el objeto que declaramos EnviarDetalesAsistentes, tené en cuenta que el próximo archivo (AssistsDetail) lo recibe por props */}
        <Link to={EnviarDetallesAsistentes}>
          <button className="btn btn-primary ocultoimpresion">
            Ver detalles
          </button>
        </Link>
      </div>
    );
  }
}

export default Advisers;

//SE REPLICA LO MISMO PARA LAS OTRAS GRÁFICAS, HAY VECES QUE SE PREPARAN MAS LAS FUNCIONES PERO SIEMPRE SE RENDERIZAN MEDIANTE LABELS Y DATA