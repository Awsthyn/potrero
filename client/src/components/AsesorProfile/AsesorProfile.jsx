import React, {useState, useEffect} from 'react';
import style from './AsesorProfile.module.css';
import AsesorStudents from './AsesorStudents/AsesorStudents.jsx';
import AsesorClases from './asesorClases/AsesorClases';
import {connect} from 'react-redux';
import {getUser, putUser} from '../../redux/actions/users';
import axios from 'axios';
import AsesorInfo from './AsesorInfo';
import EnviarEmail from './EnviarEmail';
import profilePic from '../admin/assets/avatarPerfil.jpeg'

function AsesorProfile({history, getUser, putUser, user, match}) {
	const [toggle, setToggle] = useState({
		students: true,
		classes: false,
		grades: false,
	});
	const [state, setState] = useState({
		edit: false,
		perfil: false,
		email: false,
		foto: false,
	});
	const [clases, setClases] = useState();
   const [info, setInfo] = useState(new FormData());
	const[estudiantes, setEstudiantes] = useState()

	const handleOnFileChange = e => {
		info.append('profilePicture', e.target.files[0]);
	};
	useEffect(() => {
		getUser(match.params.id)
		axios
			.get(`http://localhost:3001/class/user/${match.params.id}`)
			.then(res => setClases(res.data))
            .catch(err => console.log(err));
      axios
			.get(`http://localhost:3001/students/user/${match.params.id}`)
			.then(res => setEstudiantes(res.data))
			.catch(err => console.log(err));

		
	}, []);
    console.log(clases)
	function pestañas(e) {
		let defaultToggle = {
			students: false,
			classes: false,
			grades: false,
		};
		setToggle({...defaultToggle, [e.target.name]: true});
	}
    console.log(user)
	return (
		<div className={style.outer}>
			<div className={style.container}>
				<div className={style.profile}>
					<svg
						viewBox="0 0 16 16"
						className={style.leftArrow}
						onClick={() => history.goBack()}
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
						/>
					</svg>
					<img
						className={style.photo}
						src={user.profilePicture === 'tampoco' ? profilePic : `http://localhost:3001/uploads/perfil/${user.profilePicture} `}
						
						alt=""
					/>
                    <label className={style.cargarImg} 
                    onClick={() => setTimeout(function(){setState({...state, foto: true});}, 2000)}>
						<form id="profileForm">
							<input
								id={style.ocultar}
								name="profilePicture"
								type="file"
								accept=".png, .jpg, .jpeg"
								onChange={e => handleOnFileChange(e)}
							/>
						</form>
						<span className="material-icons" style ={{fontSize: '1.2em', color: 'white', backgroundColor: '#492bc4', borderRadius: '50%' , border: '3px solid white', padding: '1%', position: 'absolute', top: '88px', right: '205px'}}> photo_camera </span>
					</label>
						{state.foto ? (
							<div style = {{display: 'block', marginTop: '5%'}}>
								<button className = {style.imgBtn}
									onClick={() => {
										putUser(user.id, info);
										setState({...state, foto: false});
									}}>
									Actualizar
								</button>
								<button style={{display: 'inline'}} className = {style.imgBtn} onClick={() => setState({...state, foto: false})}> Cancelar </button>
							</div>
						) : null}
					<h4 className={style.name}>
						{`${user.firstName} ${user.lastName}`}
						<svg
							onClick={() => {
								setState({...state, email: false, perfil: false, edit: !state.edit});
							}}
							width="0.9em"
							height="0.9em"
							className={style.icon}
							viewBox="0 0 16 16"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
							/>
						</svg>
					</h4>
					<p className={style.verified}>
						<span className={style.span}>Admitido</span>
						<svg
							width="1.15em"
							height="1.15em"
							viewBox="0 0 16 16"
							className={style.check}
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
							/>
							<path
								fillRule="evenodd"
								d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
							/>
						</svg>
					</p>
					<div className={style.buttons}>
						<i
							className={`fas fa-user ${style.actions}`}
							onClick={() => {
								setState({...state, email: false, perfil: !state.perfil, edit: false});
							}}></i>
						{/* <i className={`far fa-calendar-alt ${style.actions}`}></i>
						<i className={`fab fa-wpforms ${style.actions}`}></i> */}
						<i
							className={`fas fa-envelope ${style.actions}`}
							onClick={() => {
								setState({...state, email: !state.email, perfil: false, edit: false});
							}}></i>
						{/* <i className={`fas fa-plus ${style.actions}`}></i> */}
					</div>
					{state.edit ? (
						<AsesorInfo putUser={putUser} user={user} />
					) : (
						<div>
							<p className={style.asesorinfo}>Materias</p>
							<div className={style.subjectsContainer}>
								{user.subjects?.map(subject => (
									<p key={subject.id} className={style.subjects}>
										{subject.name}
									</p>
								))}
							</div>
						</div>
					)}
					{state.perfil ? <AsesorInfo user={user} /> : null}
					{state.email ? <EnviarEmail user={user} /> : null}
				</div>

				<div className={style.cards}>
					<div className={style.filter}>
						<div className={style.items}>
							<button
								onClick={e => pestañas(e)}
								name="students"
								className={toggle.students ? style.itemOn : style.item}>
								Estudiantes
							</button>
							<button
								onClick={e => pestañas(e)}
								name="classes"
								className={toggle.classes ? style.itemOn : style.item}>
								Clases
							</button>
							{/* <button
								onClick={e => pestañas(e)}
								name="grades"
								className={toggle.grades ? style.itemOn : style.item}>
								Notas
							</button> */}
						</div>
					</div>
					{toggle.students ? <AsesorStudents students={estudiantes}/> : null}
					{toggle.classes ? <div  className={style.clases} > {clases.map(c =>                  
                        <AsesorClases key={c.id} clase={c} /> )}
                  	</div>
                        : null}
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.users.user,
	};
}

export default connect(mapStateToProps, {getUser, putUser})(AsesorProfile);
