import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
//import estadisticas from './assets/estadisticas.png';
//import AllStats from '../stats/AllStats';
import MiStats from "../stats/MiStats.jsx";
import Demands from "../stats/Demands.jsx";
import Offers from "../stats/Offers.jsx";
import OfferDemand from "../stats/offerDemand";
import Qualifications from "../stats/Quafilications";
import StatusVoluntary from "../stats/StatusVoluntary.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import * as actions from "../../redux/actions/stats.js";
import "./stats.css";

const VIOLETA = "#492BC4";
const VERDE = "#8CC63E";
const NEGRO = "#333333";

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
          <Demands />
        </div>
      </div>
      <br></br>
      <br></br>
      <div>
        <div className="stats">
          <Offers />
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
          <OfferDemand />
        </div>
      </div>
    </div>
  );
};
