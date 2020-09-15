import React from 'react'
import { connect } from "react-redux";
import { getSubjects,deleteSubject,postSubject} from "../../redux/actions/subject"
import moment from 'moment';
import 'moment/locale/es';
import swal from 'sweetalert';
import {Link} from 'react-router-dom'
moment.locale('es');

class TablaMaterias extends React.Component {
    constructor(props) {
        super(props);
          this.state = {}
          this.handleAddition = this.handleAddition.bind(this) 
          this.handleDeletion = this.handleDeletion.bind(this) 
          this.handleRename =  this.handleRename.bind(this)
    };
    componentDidMount(){
        this.props.getSubjects();
    }

    handleDeletion(id){
  
        swal({
            title: "¡¡ Cuidado !!",
            text: "Confirmando esta acción, eliminarás una materia para siempre",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            this.props.deleteSubject(Number(id))
            console.log(id);
              swal("El registro fue destruido con éxito", {
                icon: "success",
              });
            } else {
              swal("El registro fue conservado");
            }
          });
    
    }
    handleAddition(subject){
        swal({
          title: `Estás por dar de alta una Materia: ${subject.name}.`,
          text: "¿Está seguro? Si confirma esta acción, la materia estará disponible.",
          icon: "warning",
          buttons: true,
          dangerMode: false,
        })
        .then((confirm) => {
          if (confirm) {
            this.props.postSubject(subject)
            swal("La Materia fue creada con éxito.", {
              icon: "success",
            });
          } else {
            swal("La Materia no fue creada.");
          }
        });   
    }

    handleRename(idSubject){
      swal('Modificaremos el nombre de la Materia aquì') 
  }
  
    render() { 
        
         return(   
                <div className='container ' >
                  <div>
                  <button key={`AgregarMateria`} className="btn btn-success border" onClick={e => this.handleAddition({name:'Matematicaaa'})}>
                  <i class="fa fa-plus-square" aria-hidden="true"> Agregar Materia</i>
                                                                                  
                   </button>
                  </div>
                      {this.props.subjects.length ? <table className="table table-striped border">
                            <thead>
                                <tr>
                                    <th scope="col">ID Materia</th>
                                    <th scope="col">Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                            {this.props.subjects && this.props.subjects.map(subject => 
                                                 <tr key={subject.id}>
                                                    <th scope="row">{subject.id}</th>
                                                    <td>{subject.name}</td>
                                                   
                                                    <td>
                                                           
                                                        <div key={subject.id}>
                                                           {/* Detalles de materias*/}
                                                            <button key={`Renombrar${subject.id}`} className={`btn btn-warning border`}  onClick={() => this.handleRename(subject)}>
                                                                 <i className={``}>Renombrar</i>                                                                 
                                                            </button>
                                                            <button key={`Eliminar${subject.id}`} name={subject.id} className="btn btn-danger border" onClick={e => this.handleDeletion(e.target.name)}>
                                                                 <i className="fa fa-trash">Eliminar</i>                                                                   
                                                            </button>
                                                            
                                                            
                                                        </div>
                                                    </td>
                                                
                                                </tr>)}
                            </tbody>
                        </table> : <div className='container-flud'><p className='card-text'>En este momento no hay Materias </p> <Link to='/admin' type="button" className="btn btn-danger border"> Regresar al panel de Admin </Link> </div>}         
                </div>
                )
            }
}

function mapStateToProps(state) {
    return {
        subjects:state.subjects.subjects,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
        getSubjects:() => dispatch(getSubjects()),
       deleteSubject:(subjectId) => dispatch(deleteSubject(subjectId)),
       postSubject: (subject) => dispatch(postSubject(subject)),
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(TablaMaterias);
        