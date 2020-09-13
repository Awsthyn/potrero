import React from 'react'
import { connect } from 'react-redux'
import {useHistory} from "react-router-dom"

export const NavBar = () => {
    const history = useHistory()
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <span role="button" className="navbar-brand" onClick={()=> history.push('/')}>El potrero</span>
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <span role="button" className="nav-link" onClick={()=> history.push('/')}>Inicio <span className="sr-only">(current)</span></span>
      </li>
      <li className="nav-item">
        <span role="button" className="nav-link" onClick={()=> history.push('/voluntarios/formulario')}>Postularse como voluntario</span>
      </li>
      <li className="nav-item">
        <span role="button" className="nav-link" onClick={()=> history.push('/usuario/login')}>Iniciar sesión</span>
      </li>
    </ul>
  </div>
</nav>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
