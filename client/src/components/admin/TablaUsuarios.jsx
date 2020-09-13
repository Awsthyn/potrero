import React from 'react'
import { connect } from "react-redux";

 class TablaUsuarios extends React.Component {
    constructor(props) {
        super(props);
          this.state = {
            
    }
       
    };
 
    render() { 
    
         return(   
                <div >
                    Tabla Usuarios
                </div>
                )
            }
}

function mapStateToProps(state) {
    return {
  
    };
  }

  function mapDispatchToProps(dispatch) {
    return {

    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(TablaUsuarios);