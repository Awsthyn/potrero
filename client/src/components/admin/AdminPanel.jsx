import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Assist from "../stats/GeneralAssists.jsx";
import Advisers from "../stats/Advisers.jsx";
import Qualifications from "../stats/Quafilications";
import OfferWithDemand from "../stats/OffersWithDemand";
import "./stats.css";
import logo from '../admin/assets/logo.png'

const useStyles = makeStyles({
  root: {
    width: `calc(100% - ${220}px)`,
    marginLeft: 220,
  },
  font: {
    position: "absolute",
    fontFamily: "Poppins",
    fontWeight: 700,
    margin: 60,
  },
  img: {
    width: "1700px",
    objectFit: "cover",
    color: "#333333",
  },
  arreglar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    height: 40,
    width: 40,
    top: 100,
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div id="graficas">
      <div className={`titlePotrero`}>
        <h1>Fundación El Potrero</h1>
        <img src={logo} />
      </div>
      <br></br>
      <div>
        <div className="linkGraficos ocultoimpresion">
          <a href="#stats1" className="btn">
            Asistencias
          </a>
          <a href="#stats2" className="btn">
            Asesores
          </a>
          <a href="#stats3" className="btn">
            Promedio Notas
          </a>
          <a href="#stats4" className="btn">
            Ofertas/Demandas
          </a>
          <button onClick={() => window.print()} className="btn">
            Imprimir
          </button>
        </div>
        <div className="stats" id="stats">
          <div id="stats1">
            <Assist />
            {/* <Link to="/admin/inassistances" className="btn btn-primary fixBtn ocultoimpresion">Ver detalles</Link> */}
          </div>
          <br></br>
          <br></br>
          <div id="stats2">
            <Advisers />
          </div>
          <br></br>
          <br></br>
          <div id="stats3">
            <Qualifications />
          </div>
          <br></br>
          <br></br>
          <div id="stats4">
            <OfferWithDemand />
          </div>
        </div>
      </div>
    </div>
  );
};
