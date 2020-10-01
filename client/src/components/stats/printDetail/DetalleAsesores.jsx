import React, { useEffect, useState } from "react";
import Advisers from "../Advisers";
import axios from "axios";

export default function DetalleAsesores(props) {
  const [advisors, setAdvisors] = useState({});

  useEffect(async () => {
    let response = await axios("http://localhost:3001/stats/advisorstatus");

    let responseData = {
      actives: response.data.advisorsActives,
      inactives: response.data.advisorsInactives,
    };

    setAdvisors(responseData);
  }, {});

  return (
    <div className="marginAlto">
      <div className="printDetail">
        <Advisers />
      </div>
      {advisors.hasOwnProperty("actives") &&
      advisors.hasOwnProperty("inactives") ? (
        <div>
          <table className="table marginTop">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Estado</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
              </tr>
            </thead>
            <tbody>
              {advisors.actives.map((activos) => {
                return (
                  <tr>
                    <th scope="row">
                      <td>Activo</td>
                    </th>
                    <th scope="row">
                      <td>{activos.firstName}</td>
                    </th>
                    <th scope="row">
                      <td>{activos.lastName}</td>
                    </th>
                  </tr>
                );
              })}
            </tbody>
            <tbody>
              {advisors.inactives.map((inactivos) => {
                return (
                  <tr>
                    <th scope="row">
                      <td>Inactivo</td>
                    </th>
                    <th scope="row">
                      <td>{inactivos.firstName}</td>
                    </th>
                    <th scope="row">
                      <td>{inactivos.lastName}</td>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1>No hay ningún asistente actualmente.</h1>
        </div>
      )}
    </div>
  );
}
