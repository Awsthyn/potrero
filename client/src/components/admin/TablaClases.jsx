import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import ListAltIcon from '@material-ui/icons/ListAlt';
import axios from 'axios';

export default function TablaClases() {
   const [clases, setClases] = useState()

   function getClasses(){
      return axios.get('http://localhost:3001/class')
         .then(res => {
            if(typeof res.data !== 'string') {
               setClases(res.data.map(c => {
                  return {
                     userFullName: c.user.firstName +  ' ' + c.user.lastName,
                     sutudentFullname: c.student.firstName + ' ' + c.student.lastName,
                     subject: c.subject.name,
                     nameWeekDay: c.nameWeekDay,
                     hora: `${c.duration[0].value} a ${c.duration[1].value}`
                  }
               }))
            }
            else{ setClases([])}
         })
         .catch(err => console.log(err))
      }
   useEffect(()=> {
      getClasses()
   }, [])
   console.log(clases)
   return (
   
         <MaterialTable
            title="Clases Asignadas"
            columns={[
            { title: 'Alumno', field: 'sutudentFullname' },
            { title: 'Asesor', field: 'userFullName'},
            { title: 'Materia', field: 'subject' },
            { title: 'Día', field: 'nameWeekDay'},
            { title: 'Hora', field: 'hora' },
            ]}
            data={clases}        
            actions={[
               {
               icon: () => <ListAltIcon/>,
               tooltip: 'Detalle de la clase',
            //  onClick: (event, rowData) => swal("Visitaras perfil de " + rowData.firstName)
               },
         ]}
            options={{  
               actionsColumnIndex: -1,
               headerStyle: {
                  backgroundColor: '#492BC4',
                  color: 'white',
                  '&:hover': {
                     color:'white',
                     textDecoration:'none',
                  },
               }
            }}
         />
   )
   }