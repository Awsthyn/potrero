import React from 'react'
import {Link} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarsTwoToneIcon from '@material-ui/icons/StarsTwoTone';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded';
import PieChartRoundedIcon from '@material-ui/icons/PieChartRounded';
import logo from './assets/logo.jpg';

const VIOLETA = '#492BC4';
const VERDE = '#8CC63E';
const NEGRO = '#333333';
const drawerWidth = '220px';
const useStyles = makeStyles({
    root:{
        background: VIOLETA,
        position:'fixed'
    },
    font:{
        fontFamily: 'Poppins',
    },
    drawerPaper:{
            position:'fixed',
            alignItems:'baseline',
            justifyContent:'center',
            marginTop:50,
            width: 'inherit',
            justifyContent:'center'
    },

    link:{
        textDecoration:'none',
        color:'gray',
        '&:hover': {
            color:VIOLETA,
            textDecoration:'none',
         },
    },
    logo:{
          
            width:190,
            marginTop:0,
            padding:0,

    },
    icons:{
        color: 'rgb(73 43 196)',
    }
})

function AdminDrawer() {
        const classes = useStyles()
    return (
        <div style={{display:'flex'}}>
                    <Drawer
                    style={{width: drawerWidth }}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    onClose={()=>''}
                    classes={{ paper: classes.drawerPaper}}

                    >
            <List>
                <Link to= '/' className={classes.link}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons}>
                                        <img className={classes.logo} src={logo} alt=""/>
                                </ListItemIcon>
                            </ListItem>
                    </Link>
                    <Link to= '/admin' className={classes.link}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons}>
                                        <PieChartRoundedIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Panel'/>

                            </ListItem>
                    </Link>
                    <Link to= '/admin/voluntarios' className={classes.link}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons} >
                                        <StarsRoundedIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Voluntarios'/>

                            </ListItem>
                    </Link>
                    <Link to= '/admin/estudiantes' className={classes.link}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons} >
                                        <LocalLibraryIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Estudiantes'/>

                            </ListItem>
                    </Link>
                    <Link to= '/admin/usuarios' className={classes.link}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons}>
                                        <SupervisedUserCircleRoundedIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Asesores'/>

                            </ListItem>
                    </Link>
                    <Link to= '/admin/materias' className={classes.link}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons}>
                                        <SettingsApplicationsRoundedIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Gestion'/>

                            </ListItem>
                    </Link>

            </List>
                    </Drawer>
            </div>
    )
}



export default AdminDrawer
