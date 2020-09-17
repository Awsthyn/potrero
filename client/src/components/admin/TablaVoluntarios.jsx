import React from 'react'
import { connect } from "react-redux";
import { getVolunteers, deleteVolunteer, acceptVolunteer} from "../../redux/actions/voluntary"
import moment from 'moment';
import 'moment/locale/es';
import swal from 'sweetalert';
import {Link,Redirect} from 'react-router-dom'
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
    handleStatusChange(volunteer){
        swal({
          title: `Estás por dar de alta a ${volunteer.firstName} ${volunteer.lastName} como voluntario.`,
          text: "¿Está seguro? Si confirma esta acción, el voluntario se convertirá en asesor.",
          icon: "warning",
          buttons: true,
          dangerMode: false,
        })
        .then((confirm) => {
          if (confirm) {
          this.props.acceptVolunteer(volunteer)
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
                <div className='container' style={{marginLeft:220, marginTop: 40}} >
                       {this.props.volunteers.length ? <table className="table table-striped border">
                            <thead>
                                <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Email</th>
                                <th scope="col">CV</th>
                                <th scope="col">Fecha de Postulación</th>
                                <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                            {this.props.volunteers && this.props.volunteers.map(volunteer => 
                                                 <tr key={volunteer.id}>
                                                    <td>{volunteer.firstName}</td>
                                                    <td>{volunteer.lastName}</td>
                                                    <td>{volunteer.email}</td>
                                                    <td>{volunteer.cv? 'Si':'No'}</td>
                                                    <td>{moment(volunteer.createdAt).format('LLL')}hs</td>
                                                    <td>
                                                            <div className="collapse" id={`collapse${volunteer.id}`}>
                                                                <div className="card card-body">
                                                                    <p className={'card-text text'}>email: {volunteer.email} </p>
                                                                    <a href={`${volunteer.linkedin}`} className={'card-text text'}>Visitar LinkedIn</a>
                                                                    {/* <iframe src={`http://localhost:3001/uploads/${volunteer.cv}.pdf`} style={{width:'600px', height:'500px'}} frameborder="0" onClick={() => <a target='_blank'>View CV</a>}></iframe> */}
                                                                    <object data={`http://localhost:3001/uploads/${volunteer.cv}`} 
                                                                      type='application/pdf' 
                                                                      width='100%' 
                                                                      height='700px'/>
                                                                    <p>Fecha de postulación:  {moment(volunteer.createdAt).format('LLL')}hs </p>
                                                                </div>
                                                            </div>
                                                        <div key={volunteer.id}>
                                                          <Link to={`/admin/voluntarios/${volunteer.id}`} key={`detalles${volunteer.id}`} className="btn btn-primary border" type="button">
                                                            Detalles 
                                                          </Link>

                                                            <button key={`aceptar${volunteer.id}`} className={`${volunteer.state ==='pendiente'? "btn-warning":"btn-success "} btn border`}  onClick={() => this.handleStatusChange(volunteer)}>
                                                                 <i className={`${volunteer.state === 'pendiente'? "fa fa-toggle-off":"fa fa-toggle-on"}`}></i> 
                                                                 {volunteer.state ==='pendiente'? 'Aceptar':'Activo'}                                                                
                                                            </button>
                                                            <button key={`rechazar${volunteer.id}`} name={volunteer.id} className="btn btn-danger border" onClick={e => this.handleDeletion(volunteer.id)}>
                                                                 <i name={volunteer.id} className="fa fa-trash">Rechazar</i>                                                                   
                                                            </button>
                                                            
                                                        </div>
                                                    </td>
                                                
                                                </tr>)}
                            </tbody>
                        </table> : <div className='container-flud'><h6 className='card-text'>En este momento no hay postulaciones pendientes </h6> <Link to='/admin' type="button" className="btn btn-danger border"> Regresar al panel de Admin </Link> </div>}         
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
       acceptVolunteer: (id) => dispatch(acceptVolunteer(id)),
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(TablaVoluntarios);
        