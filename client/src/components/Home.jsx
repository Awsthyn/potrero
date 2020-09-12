import React from 'react'
import {useHistory} from 'react-router-dom'

const Home = () => {
    const history = useHistory()
    return (
<>
<div className="jumbotron">
  <h1 className="display-4">El Potrero</h1>
  <p className="lead">Apoyo educativo</p>
  <p>Hecho por Henrys</p>
  <hr className="my-4" />
</div>
<button type="button" className="mr-4 btn btn-primary" onClick={()=> history.push('/voluntarios/formulario')}>Postularse como voluntario</button>
<button type="button" className="btn btn-primary" onClick={()=> history.push('/usuario/login')}>Iniciar sesión</button>




</>
    )
}

export default Home
