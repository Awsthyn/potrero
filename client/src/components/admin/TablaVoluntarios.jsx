import React from 'react'
import { connect } from "react-redux";
import { getVolunteers, postMailWelcome } from "../../redux/actions/voluntary"
import moment from 'moment';
import 'moment/locale/es';
import swal from 'sweetalert';

moment.locale('es');

class TablaVoluntarios extends React.Component {
    constructor(props) {
        super(props);
          this.state = {

          }
          this.handleStatusChangue = this.handleStatusChangue.bind(this) 
    };
    componentDidMount(){
        this.props.getVolunteers();
    }

    handleStatusChangue(e){
        e.preventDefault()
        swal('Tiempo de enviar mensajes')
    }
    render() { 
    
         return(   
                <div className='container ' >
                        <table className="table table-striped border">
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
                                            {this.props.volunteers.map(volunteer => 
                                                
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
                                                            <button className="btn btn-primary border" onClick={this.handleStatusChangue}>
                                                                Status                                                                    
                                                            </button>
                                                        </div>
                                                    </td>
                                                
                                                </tr>
                                                )}
                                           
                            </tbody>
                        </table>
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
       getVolunteers:() => dispatch(getVolunteers())  
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(TablaVoluntarios);
        