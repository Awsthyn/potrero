import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
//import estadisticas from './assets/estadisticas.png';
//import AllStats from '../stats/AllStats';
import MiStats from "../stats/MiStats.jsx";
import Demands from "../stats/Demands.jsx";
import Offers from "../stats/Offers.jsx";
import OffersDemand from "../stats/offerDemand.jsx";
import Qualifications from "../stats/Quafilications";
import OfferWithDemand from "../stats/GraficarAll";
import StatusVoluntary from "../stats/StatusVoluntary.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import * as actions from "../../redux/actions/stats.js";
import estadisticas from "./assets/estadisticas.png";
import "./stats.css";

const VIOLETA = "#492BC4";
const VERDE = "#8CC63E";
const NEGRO = "#333333";

function imprimir(){
    let input = window.document.getElementById("graficas");
    document.getElementsByClassName('makeStyles-root-1')[0].style.visibility = 'hidden';
    window.print(input);
    document.getElementsByClassName('makeStyles-root-1')[0].style.visibility = 'visible';
}

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
});

export default () => {
  const classes = useStyles();
  return (
    <div id="graficas">
    <p><button onClick={imprimir} className="ocultoimpresion btn btn-primary float-right">PRINT</button></p>
    <div>
      <br></br>
      <br></br>
      <div>
        <div className="stats">
          <MiStats />
        </div>
      </div>
      <br></br>
      <br></br>
      <div>
        <div className="stats">
          <StatusVoluntary />
        </div>
      </div>
      <br></br>
      <br></br>
      <div>
        <div className="stats">
          <Qualifications />
        </div>
      </div>
      <div>
        <div className="stats">
          <OfferWithDemand />
        </div>
      </div>
    </div>
    </div>
  );
};
