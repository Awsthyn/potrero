import React from 'react';
import style from './DetalleHV.module.css';

function DetalleHorariosVoluntario({ id, schedule, getUserSchedule }) {
  const days = ['GTM-3', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  const timetable = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
  ];
  let horarios = [
    { day: [], gridRow: '' },
    { day: [], gridRow: '' },
    { day: [], gridRow: '' },
    { day: [], gridRow: '' },
    { day: [], gridRow: '' },
  ];
  let intervalsAmount = [
    { day: 'Lunes', interval: 0 },
    { day: 'Martes', interval: 0 },
    { day: 'Miercoles', interval: 0 },
    { day: 'Jueves', interval: 0 },
    { day: 'Viernes', interval: 0 },
  ];

  if (schedule && schedule.userSchedules) {
    schedule.userSchedules.forEach((prop) => {
      if (prop.nameWeekDay === 'Lunes') {
        intervalsAmount[0].interval += 1;
      } else if (prop.nameWeekDay === 'Martes') {
        intervalsAmount[1].interval += 1;
      } else if (prop.nameWeekDay === 'Miercoles') {
        intervalsAmount[2].interval += 1;
      } else if (prop.nameWeekDay === 'Jueves') {
        intervalsAmount[3].interval += 1;
      } else if (prop.nameWeekDay === 'Viernes') {
        intervalsAmount[4].interval += 1;
      }
    });

    intervalsAmount.forEach((int) => {
      let horarioAux = Number(timetable[0].split(':')[0]);
      if (int.interval === 0 && int.day === 'Lunes') {
        horarios[0].gridRow = '1fr';
        horarios[0].day.push(
          <div style={{ backgroundColor: 'whitesmoke' }}></div>
        );
      } else if (int.interval === 0 && int.day === 'Martes') {
        horarios[1].gridRow = '1fr';
        horarios[1].day.push(
          <div style={{ backgroundColor: 'whitesmoke' }}></div>
        );
      }
      if (int.interval === 0 && int.day === 'Miercoles') {
        horarios[2].gridRow = '1fr';
        horarios[2].day.push(
          <div style={{ backgroundColor: 'whitesmoke' }}></div>
        );
      }
      if (int.interval === 0 && int.day === 'Jueves') {
        horarios[3].gridRow = '1fr';
        horarios[3].day.push(
          <div style={{ backgroundColor: 'whitesmoke' }}></div>
        );
      }
      if (int.interval === 0 && int.day === 'Viernes') {
        horarios[4].gridRow = '1fr';
        horarios[4].day.push(
          <div style={{ backgroundColor: 'whitesmoke' }}></div>
        );
      } else if (int.interval > 0) {
        const currentDay = schedule.userSchedules
          .filter((prop) => {
            return prop.nameWeekDay === int.day;
          })
          .map((current) => current.timeFrame)
          .sort((a, b) => Number(a[0].value) - Number(b[0].value));

        let rangoHorario;

        if (int.day === 'Lunes') {
          for (const interval of currentDay) {
            const horaInicio =
              interval[0].value.split('.')[0] +
              ':' +
              (interval[0].value.split('.')[1] ? '30' : '00');
            const horaFin =
              interval[1].value.split('.')[0] +
              ':' +
              (interval[1].value.split('.')[1] ? '30' : '00');

            if (Number(interval[0].value) - horarioAux > 0) {
              horarios[0].day.push(
                <div style={{ backgroundColor: 'whitesmoke' }}></div>
              );
              rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
              horarios[0].gridRow += `${rangoHorario}fr `;
            }

            horarios[0].day.push(
              <div
                style={{
                  borderBottom: '1px solid whitesmoke',
                  borderColor: '2px 0',
                  backgroundColor: '#8CC63F',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div style={{ alignSelf: 'center' }}>
                  {horaInicio} - {horaFin}
                </div>
              </div>
            );
            rangoHorario =
              (Number(interval[1].value) - Number(interval[0].value)) * 2;
            horarios[0].gridRow += `${rangoHorario}fr `;
            horarioAux = Number(interval[1].value);
          }

          let rango =
            (Number(timetable[timetable.length - 1].split(':')[0]) +
              1 -
              horarioAux) *
            2;

          if (rango > 0) {
            horarios[0].day.push(
              <div style={{ backgroundColor: 'whitesmoke' }}></div>
            );
            horarios[0].gridRow += `${rango}fr`;
          }
        } else if (int.day === 'Martes') {
          for (const interval of currentDay) {
            const horaInicio =
              interval[0].value.split('.')[0] +
              ':' +
              (interval[0].value.split('.')[1] ? '30' : '00');
            const horaFin =
              interval[1].value.split('.')[0] +
              ':' +
              (interval[1].value.split('.')[1] ? '30' : '00');

            if (Number(interval[0].value) - horarioAux > 0) {
              horarios[1].day.push(
                <div style={{ backgroundColor: 'whitesmoke' }}></div>
              );
              rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
              horarios[1].gridRow += `${rangoHorario}fr `;
            }

            horarios[1].day.push(
              <div
                style={{
                  borderBottom: '1px solid whitesmoke',
                  borderWidth: '2px 0',
                  backgroundColor: '#8CC63F',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div style={{ alignSelf: 'center' }}>
                  {horaInicio} - {horaFin}
                </div>
              </div>
            );
            rangoHorario =
              (Number(interval[1].value) - Number(interval[0].value)) * 2;
            horarios[1].gridRow += `${rangoHorario}fr `;
            horarioAux = Number(interval[1].value);
          }

          let rango =
            (Number(timetable[timetable.length - 1].split(':')[0]) +
              1 -
              horarioAux) *
            2;

          if (rango > 0) {
            horarios[1].day.push(
              <div style={{ backgroundColor: 'whitesmoke' }}></div>
            );
            horarios[1].gridRow += `${rango}fr`;
          }
        } else if (int.day === 'Miercoles') {
          for (const interval of currentDay) {
            const horaInicio =
              interval[0].value.split('.')[0] +
              ':' +
              (interval[0].value.split('.')[1] ? '30' : '00');
            const horaFin =
              interval[1].value.split('.')[0] +
              ':' +
              (interval[1].value.split('.')[1] ? '30' : '00');

            if (Number(interval[0].value) - horarioAux > 0) {
              horarios[2].day.push(
                <div style={{ backgroundColor: 'whitesmoke' }}></div>
              );
              rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
              horarios[2].gridRow += `${rangoHorario}fr `;
            }

            horarios[2].day.push(
              <div
                style={{
                  borderBottom: '1px solid whitesmoke',
                  borderWidth: '2px 0',
                  backgroundColor: '#8CC63F',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div style={{ alignSelf: 'center' }}>
                  {horaInicio} - {horaFin}
                </div>
              </div>
            );
            rangoHorario =
              (Number(interval[1].value) - Number(interval[0].value)) * 2;
            horarios[2].gridRow += `${rangoHorario}fr `;
            horarioAux = Number(interval[1].value);
          }

          let rango =
            (Number(timetable[timetable.length - 1].split(':')[0]) +
              1 -
              horarioAux) *
            2;

          if (rango > 0) {
            horarios[2].day.push(
              <div style={{ backgroundColor: 'whitesmoke' }}></div>
            );
            horarios[2].gridRow += `${rango}fr`;
          }
        } else if (int.day === 'Jueves') {
          for (const interval of currentDay) {
            const horaInicio =
              interval[0].value.split('.')[0] +
              ':' +
              (interval[0].value.split('.')[1] ? '30' : '00');
            const horaFin =
              interval[1].value.split('.')[0] +
              ':' +
              (interval[1].value.split('.')[1] ? '30' : '00');

            if (Number(interval[0].value) - horarioAux > 0) {
              horarios[3].day.push(
                <div style={{ backgroundColor: 'whitesmoke' }}></div>
              );
              rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
              horarios[3].gridRow += `${rangoHorario}fr `;
            }

            horarios[3].day.push(
              <div
                style={{
                  borderBottom: '1px solid whitesmoke',
                  borderWidth: '2px 0',
                  backgroundColor: '#8CC63F',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div style={{ alignSelf: 'center' }}>
                  {horaInicio} - {horaFin}
                </div>
              </div>
            );
            rangoHorario =
              (Number(interval[1].value) - Number(interval[0].value)) * 2;
            horarios[3].gridRow += `${rangoHorario}fr `;
            horarioAux = Number(interval[1].value);
          }

          let rango =
            (Number(timetable[timetable.length - 1].split(':')[0]) +
              1 -
              horarioAux) *
            2;

          if (rango > 0) {
            horarios[3].day.push(
              <div style={{ backgroundColor: 'whitesmoke' }}></div>
            );
            horarios[3].gridRow += `${rango}fr`;
          }
        } else if (int.day === 'Viernes') {
          for (const interval of currentDay) {
            const horaInicio =
              interval[0].value.split('.')[0] +
              ':' +
              (interval[0].value.split('.')[1] ? '30' : '00');
            const horaFin =
              interval[1].value.split('.')[0] +
              ':' +
              (interval[1].value.split('.')[1] ? '30' : '00');

            if (Number(interval[0].value) - horarioAux > 0) {
              horarios[4].day.push(
                <div style={{ backgroundColor: 'whitesmoke' }}></div>
              );
              rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
              horarios[4].gridRow += `${rangoHorario}fr `;
            }

            horarios[4].day.push(
              <div
                style={{
                  borderBottom: '1px solid whitesmoke',
                  borderWidth: '2px 0',
                  backgroundColor: '#8CC63F',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div style={{ alignSelf: 'center' }}>
                  {horaInicio} - {horaFin}
                </div>
              </div>
            );
            rangoHorario =
              (Number(interval[1].value) - Number(interval[0].value)) * 2;
            horarios[4].gridRow += `${rangoHorario}fr `;
            horarioAux = Number(interval[1].value);
          }

          let rango =
            (Number(timetable[timetable.length - 1].split(':')[0]) +
              1 -
              horarioAux) *
            2;

          if (rango > 0) {
            horarios[4].day.push(
              <div style={{ backgroundColor: 'whitesmoke' }}></div>
            );
            horarios[4].gridRow += `${rango}fr`;
          }
        }
      }
    });
  }

  return (
    <div className={style.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '250px',
          }}
        >
          <div
            style={{
              border: '1px solid #8CC63F',
              alignSelf: 'center',
              width: '30px',
              height: '15px',
              backgroundColor: '#8CC63F',
              display: 'inline-block',
            }}
          ></div>
          <span style={{ marginLeft: '5px' }}>Rango elegido</span>
        </div>
        <div></div>
      </div>
      {schedule ? (
        <div>
          <div className={style.catainerDays}>
            {days.map((day) => (
              <div className={style.catainerOneDay}>{day}</div>
            ))}
          </div>
          <div className={style.box}>
            <div className={style.catainerTimetable}>
              <div>
                {timetable.map((time) => (
                  <div className={style.catainerOneTimetable}>{time}</div>
                ))}
              </div>
              <div className={style.schedule}>
                {schedule.userSchedules &&
                  horarios.map((horario) => {
                    return (
                      <div
                        className={style.boxHorario}
                        style={{ gridTemplateRows: `${horario.gridRow}` }}
                      >
                        {horario.day}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4 className={style.title}>Rango no disponible</h4>
        </div>
      )}
    </div>
  );
}

export default DetalleHorariosVoluntario;