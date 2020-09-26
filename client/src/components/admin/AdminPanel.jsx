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
import Button from '@material-ui/core/Button';

const VIOLETA = "#492BC4";
const VERDE = "#8CC63E";
const NEGRO = "#333333";

function closePrint () {
  document.body.removeChild(this.__container__);
}

function setPrint () {
  this.contentWindow.__container__ = this;
  this.contentWindow.onbeforeunload = closePrint;
  this.contentWindow.onafterprint = closePrint;
  this.contentWindow.focus(); // Required for IE
  this.contentWindow.print();
}

function printPage (sURL) {
  var oHiddFrame = document.createElement("iframe");
  oHiddFrame.onload = setPrint;
  oHiddFrame.style.position = "fixed";
  oHiddFrame.style.right = "0";
  oHiddFrame.style.bottom = "0";
  oHiddFrame.style.width = "0";
  oHiddFrame.style.height = "0";
  oHiddFrame.style.border = "0";
  oHiddFrame.src = sURL;
  document.body.appendChild(oHiddFrame);
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
//<img className = {classes.img} src = {estadisticas} alt = ""/> <h1 className= {classes.font}>Asistencia de alumnos</h1>
export default () => {
  const classes = useStyles();
  return (
    <div id="graficas">
    <div className={classes.root}>
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
    //()=>window.print()}
    <p><button onClick={() => window.print()} className="ocultoimpresion">PRINT</button></p>
    <elemento className="oculto-impresion">Esto no aparece en la impresión pero sí en la página web</elemento>

    </div>
  );
};
