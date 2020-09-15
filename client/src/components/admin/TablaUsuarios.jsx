import React from 'react'
import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/users"
import UserDetailsModal from "./UserDetailsModal"


 class TablaUsuarios extends React.Component {
    constructor(props) {
        super(props);
          this.state = {
            
    }
       
    };
    componentDidMount(){
      this.props.getUsers();
  }
 
    render() { 
    
         return(   
                <div >
                    <h1 className="mt-3 mb-3">Tabla de Usuarios</h1>
                    {Array.isArray(this.props.users) && this.props.users.length > 0 ? 
                    <table className="table table-striped border">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Rol</th>
                          <th>Activo</th>
                          <th>Detalles</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.users.map(u =>
                          <tr>
                          <td>{u.firstName}<UserDetailsModal user={u} /></td>
                          <td>{u.lastName}</td>
                          <td>{u.state}</td>
                          {u.isActive ? <td>Activo</td> : <td>Inactivo</td>}
                          <td><button data-toggle="modal" data-target={`#userModal${u.id}`} className="btn btn-info mt-n3 mb-n3">Detalles</button></td>
                        </tr>
                      )}
                      </tbody>
                    </table> 
                    : <h2>No hay usuarios en el sistema</h2>}
                </div>
                )
            }
}

function mapStateToProps(state) {
    return {
      users:state.users.users,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      getUsers:() => dispatch(getUsers()),

    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(TablaUsuarios);