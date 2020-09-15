import React from 'react'
import { connect } from "react-redux";
import { getVolunteers, postMailWelcome,deleteVolunteer, acceptVolunteer } from "../../redux/actions/voluntary"
import moment from 'moment';
import 'moment/locale/es';
import swal from 'sweetalert';
import {Link} from 'react-router-dom'
moment.locale('es');

class TablaVoluntarios extends React.Component {
    constructor(props) {
        super(props);
          this.state = {

          }
          this.handleStatusChange = this.handleStatusChange.bind(this) 
          this.handleDeletion = this.handleDeletion.bind(this) 
    };
    componentDidMount(){
        this.props.getVolunteers();
    }
    handleDeletion(id){
  
        swal({
            title: "¡¡ Cuidado !!",
            text: "No se recomienda en lo absoluto este tipo de acciones. Si continúa, estará eliminando datos muy valiosos... Se recomienda simplemente rechazar al postulante",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            this.props.deleteVolunteer(Number(id))
            console.log(id);
              swal("El registro fue destruido con éxito", {
                icon: "success",
              });
            } else {
              swal("El registro fue conservado");
            }
          });
    
    }
    handleStatusChange(name){
        swal({
          title: `Estás por dar de alta a ${name.firstName} ${name.lastName} como voluntario.`,
          text: "¿Está seguro? Si confirma esta acción, el voluntario se convertirá en asesor.",
          icon: "warning",
          buttons: true,
          dangerMode: false,
        })
        .then((confirm) => {
          if (confirm) {
          this.props.acceptVolunteer(Number(name.id))
            swal("El usuario se convirtió en asesor.", {
              icon: "success",
            });
          } else {
            swal("No se pudo convertir en asesor al usuario.");
          }
        });
        
    }
    render() { 
    
         return(   
                <div className='container ' >
                       {this.props.volunteers.length ? <table className="table table-striped border">
                            <thead>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">CV</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                            {this.props.volunteers && this.props.volunteers.map(volunteer => 
                                                 <tr key={volunteer.id}>
                                                    <th scope="row">{volunteer.id}</th>
                                                    <td>{volunteer.firstName}</td>
                                                    <td>{volunteer.lastName}</td>
                                                    <td>{volunteer.phone}</td>
                                                    <td>{volunteer.cv? 'Si':'No'}</td>
                                                    <td>{volunteer.state}</td>
                                                    <td>
                                                            <div className="collapse" id={`collapse${volunteer.id}`}>
                                                                <div className="card card-body">
                                                                    <p className={'card-text text'}>email: {volunteer.email} </p>
                                                                    <a href={`${volunteer.linkedin}`} className={'card-text text'}>Visitar LinkedIn</a>
                                                                    <p>Fecha de postulación:  {moment(volunteer.createdAt).format('LLL')}hs </p>
                                                                </div>
                                                            </div>
                                                        <div>
                                                            <button className="btn btn-primary border" type="button" data-toggle="collapse" data-target={`#collapse${volunteer.id}`} aria-expanded="false" aria-controls="collapseExample">
                                                                Detalles
                                                            </button> 
                                                            <button className={`${volunteer.state =='pendiente'? "btn-warning ":"btn-success"} btn border`}  onClick={() => this.handleStatusChange({firstName : volunteer.firstName, lastName: volunteer.lastName, id: volunteer.id})}>
                                                                 <i className={`${volunteer.state =='pendiente'? "fa fa-toggle-off":"fa fa-toggle-on"}`}>Estado</i>                                                                 
                                                            </button>
                                                            <button name={volunteer.id} className="btn btn-danger border" onClick={e => this.handleDeletion(e.target.name)}>
                                                                 <i name={volunteer.id} className="fa fa-trash"></i>                                                                   
                                                            </button>
                                                            
                                                        </div>
                                                    </td>
                                                
                                                </tr>)}
                            </tbody>
                        </table> : <div className='container-flud'><p className='card-text'>En este momento no hay postulaciones </p> <Link to='/admin' type="button" className="btn btn-danger border"> Regresar al panel de Admin </Link> </div>}         
                </div>
                )
            }
}

function mapStateToProps(state) {
    return {
        volunteers:state.volunteers.volunteers,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
       getVolunteers:() => dispatch(getVolunteers()),
       deleteVolunteer:(id) => dispatch(deleteVolunteer(id)),
       acceptVolunteer: (id) => dispatch(acceptVolunteer(id))
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(TablaVoluntarios);
        