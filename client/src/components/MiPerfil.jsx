import React from 'react';
import { Link } from "react-router-dom"
// import { connect } from "react-redux";
import swal from 'sweetalert'
import style from "./MiPerfil.module.css"


  export default function Profile() {

                    return (
                    <div className="jumbotron">
                        <div className={`${style.container}`}>
                            <div className={`${style.img}`}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6e3HMzWullxWyCbMl3xUvT6qTXGRVL8NTLg&usqp=CAU" className="rounded float-left" alt="Imagen de perfil" />
                            </div>
                        
                            <div className={`${style.textContaint} offset-1`}>
                            <h1 className={`${style.title}`}>Mi Perfil</h1>
                            <hr className="my-4"/>
                            <h4>Nombre y apellido:</h4>
                            <p className={`${style.text}`}>{'store data name'} {'store data surname'}</p>
                            <h4>Correo electrónico:</h4>
                            <p className={`${style.text}`}> {'store data email'}</p>
                        
                            <div >
                            <Link onClick={()=>swal("click redirecciona a otro lado")} className={`${style.button} btn btn-secondary`} to="/">Ver detalles</Link>
                            <Link onClick={()=>swal("comfirmaciòn alert")} className={`${style.buttonDelete} btn btn-danger`} to="/">Eliminar cuenta</Link>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                    )
  }
