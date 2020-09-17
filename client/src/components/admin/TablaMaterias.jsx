import React from 'react'
import { connect } from "react-redux";
import { getSubjects,deleteSubject,postSubject,putSubject} from "../../redux/actions/subject"
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';
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
              swal("El registro fue destruido con éxito", {
                icon: "success",
              });
            } else {
              swal("El registro fue conservado");
            }
          });
    
    }
    async handleAddition(){
      const { value: materia } = await Swal.fire({
        title: 'Ingresa el nombre de la Materia',
        input: 'text',
        inputPlaceholder: 'Por ejemplo: computación'
      })
      
      if (materia) {
        Swal.fire(`Se agregará a los registros la materia: ${materia}`)
        this.props.postSubject({name: materia})
      }
    }

    async handleRename(subject){
      const { value: rename } = await Swal.fire({
        title: 'Ingresa el nombre nuevo',
        input: 'text',
        inputPlaceholder: `Por ejemplo: ${subject.name}002`
      })
      
      if (rename) {
        Swal.fire(`Se reemplazará el nombre de ${subject.name} por  ${rename}`)
        this.props.putSubject({id: subject.id, name:rename})
      }
   
  }
  
    render() { 
        
         return(   
                <div className='container ' style={{marginLeft:220, marginTop:30}} >
                  <div>
                  <button key={`AgregarMateria`} className="btn btn-success border" onClick={e => this.handleAddition()}>
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
                                            {this.props.subjects.length && this.props.subjects.map(subject => 
                                                 <tr key={subject.id}>
                                                    <th scope="row">{subject.id}</th>
                                                    <td>{subject.name}</td>
                                                   
                                                    <td>
                                                           
                                                        <div key={subject.id}>
                                                           {/* Detalles de materias*/}
                                                            <button key={`Renombrar${subject.id}`} className={`btn btn-warning border`}  onClick={() => this.handleRename(subject)}>
                                                                 <i name={subject.id} disabled className={``}></i> 
                                                                 Renombrar                                                                
                                                            </button>
                                                            <button key={`Eliminar${subject.id}`} name={subject.id} className="btn btn-danger border" onClick={() => this.handleDeletion(subject.id)}>
                                                                 <i name={subject.id}  className="fa fa-trash" disabled></i>   
                                                                 Eliminar                                                                
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
        putSubject: subject => dispatch(putSubject(subject))
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(TablaMaterias);
        