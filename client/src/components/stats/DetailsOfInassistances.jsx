import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DetailsOfInassistances() {
  const [studentData, setStudentData] = useState([]);
  const weekDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

  useEffect(async () => {
    const result = await axios("http://localhost:3001/stats/assistances", {
      withCredentials: true,
    });
    setStudentData(result.data.noJustifyDetails);
  }, []);

  const mostrar = [];

  studentData.forEach((daysWithStudents) => {
    weekDays.forEach((day) => {
      if (daysWithStudents[day]) {
        mostrar.push(daysWithStudents[day]);
      }
    });
  });

  return mostrar.length === 0 ? (
    <div>
      <h1 className="centerTitle">
        No hay estudiantes con faltas injsutificadas.
      </h1>
    </div>
  ) : (
    <div>
      <ul className="card-group container">
        <h3 className="card-title">Datos de los estudiantes</h3>
        <div class="row row-cols-1 row-cols-md-2">
          {
            //    console.log(mostrar)
            mostrar.length > 0 ? (
              mostrar.map((student) => {
                console.log(student);
                return (
                  <div>
                    <li key={student.id} className="noListStyle">
                      <div class="col mb-4">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">
                              Nombre: {student.firstName}
                            </h5>
                            <h6 class="card-title">
                              Apellido: {student.lastName}
                            </h6>
                            <h5 class="card-subtitle mb-2 text-muted">
                              Nombre tutor: {student.tutorFirstName}
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                              Apellido tutor: {student.tutorLastName}
                            </h6>
                            <a href="#" class="card-link">
                              Mail del estudiante
                            </a>
                            <a href="#" class="card-link">
                              Mail del tutor
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </div>
                );
              })
            ) : (
              <div>
                <h1>No hay estudiantes con faltas injsutificadas.</h1>
              </div>
            )
          }
        </div>
      </ul>
    </div>
  );
}
