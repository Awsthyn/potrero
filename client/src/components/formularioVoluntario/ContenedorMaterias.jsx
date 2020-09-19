import React from 'react';
import { postVoluntary } from '../../redux/actions/voluntary.js';
import { getSubjects } from '../../redux/actions/subject.js';
import { connect } from 'react-redux';
import Materias from './Materias';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import style1 from './Materias.module.css';
import swal from 'sweetalert';
import styles from './VoluntarioForm.module.css';

class ContenedorMaterias extends React.Component {
  constructor(props) {
    super();
    this.state = {
      materia: [],
      info: new FormData(),
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleOnFileChange = this.handleOnFileChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  handleOnClick(id, e) {
    if (e.target.style.backgroundColor === 'rgb(140, 198, 62)') {
      e.target.style.backgroundColor = 'white';
      this.setState(function (state) {
        return { materia: state.materia.filter((m) => m !== id) };
      });
    } else {
      e.target.style.backgroundColor = 'rgb(140, 198, 62)';
      this.setState({
        materia: [...this.state.materia, id],
      });
    }
  }
  handleOnChange(e) {
    const field = e.target;
    this.state.info.append(field.name, field.value);
    this.setState({ ...this.state, info: this.state.info });
  }

  handleOnFileChange = (e) => {
    const field = e.target;
    console.log(field.name);
    console.log(field.files[0]);
    this.state.info.append(field.name, field.files[0]);
    this.setState({ ...this.state, info: this.state.info });
  };

  handleSend(e) {
    e.preventDefault();
    swal({
      title: '¿Estas seguro?',
      text:
        'Antes de enviar tu solicitud verifica que tus datos sean correctos!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willSend) => {
      if (willSend) {
        console.log(this.state.info);
        let data = JSON.parse(localStorage.getItem('datos'));
        let schedule = JSON.parse(localStorage.getItem('schedule'));
        Object.entries(data).forEach((dato) => {
          console.log(dato[0] + ': ' + dato[1]);
          this.state.info.append(dato[0], dato[1]);
        });
        this.props.postVoluntary(this.state.info, this.state.materia, schedule);
        // localStorage.removeItem('datos');
        // localStorage.removeItem('schedule');
        swal('Tu solicitud ha sido enviada!', {
          icon: 'success',
        });
      } else {
        swal('Solicitud no enviada');
      }
    });
  }
  goBack() {
    this.props.history.push('/voluntarios/niveles');
  }
  componentDidMount() {
    this.props.getSubjects();
  }
  render() {
    var control;
    var materias = this.props.subjects.subjects;
    //['Matemática', 'Idiomas', 'Biología', 'Tecnología', 'Artes', 'Computación'];
    return (
      <div>
        <IconButton aria-label='ir atrás' onClick={this.goBack}>
          <span className='material-icons'>arrow_back</span>
        </IconButton>
        <div className={style1.circles}>
          <div className={styles.circleGray}>1</div>
          <div className={styles.lineGray}></div>{' '}
          <div className={styles.circleGray}>2</div>
          <div className={styles.lineGray}></div>
          <div className={styles.circleGray}>3</div>
          <div className={styles.lineGray}></div>
          <div className={styles.circleLila}>4</div>
        </div>

        {/* <form action="/multiple-upload" enctype="multipart/form-data"> */}
          <h4 className={style1.title}>¿En qué áreas podrías asistir?</h4>
          <div
            className={`${style1.contenedorMateria} ${styles.containerListNiveles}`}
          >
            {materias?.map((m, i) => (
              <Materias
                materia={m.name}
                key={i}
                handleOnClick={this.handleOnClick}
              />
            ))}
          </div>
          <br></br>
          <small>CV (Formato aceptado .pdf)</small>
          <input
            style={{ width: '80%', marginTop: '1%', display: 'block' }}
            className={styles.input}
            name='cv'
            type='file'
            accept='.pdf'
            onChange={(e) => this.handleOnFileChange(e)}
          />
          <br></br>
          <small>Frente del DNI (Formato aceptado .png, .jpg o .jpeg)</small>
          <input
            style={{ width: '80%', marginTop: '1%', display: 'block' }}
            className={styles.input}
            name='frontDNI'
            type='file'
            accept='.png, .jpg, .jpeg'
            placeholder='fdzgdfgfdgfd'
            onChange={(e) => this.handleOnFileChange(e)}
          />
          <br></br>
          <small>Reverso del DNI (Formato aceptado .png, .jpg o .jpeg)</small>
          <input
            style={{ width: '80%', marginTop: '1%', display: 'block' }}
            className={styles.input}
            name='backDNI'
            type='file'
            accept='.png, .jpg, .jpeg'
            onChange={(e) => this.handleOnFileChange(e)}
          />
          <br></br>
          <small>Linkedin</small>
          <input
            style={{ width: '80%', marginTop: '1%', display: 'block' }}
            className={styles.input}
            name='linkedin'
            placeholder='ej: www.linkedin.com/tu_cuenta/'
            type='text'
            id='standard-basic6'
            onChange={(e) => this.handleOnChange(e)}
          />
          {/* {!this.state.info.linkedin && !this.state.info.cv ? (control = true) : false} */}
          <Button
            disabled={control ? true : false}
            variant='contained'
            style={{ marginTop: '3rem' }}
            className={style1.botonEnviar}
            type='submit'
            value='Submit'
            onClick={(e) => this.handleSend(e)}
          >
            Enviar
          </Button>
        {/* </form> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    subjects: state.subjects,
  };
}
export default connect(mapStateToProps, { postVoluntary, getSubjects })(
  ContenedorMaterias
);
