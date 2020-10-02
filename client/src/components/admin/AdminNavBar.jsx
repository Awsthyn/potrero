import React from 'react'
import { connect } from 'react-redux';
import {Link,useHistory} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PieChartIcon from '@material-ui/icons/PieChart'
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import { sessionLogout } from '../../redux/actions/session';
import Miembros from './MenuItemMiembros';
import Gestion from './MenuItemGestion';
import BookIcon from '@material-ui/icons/Book';
import AssistantIcon from '@material-ui/icons/Assistant';
import Box from '@material-ui/core/Box';

const VIOLETA = '#492BC4'
const VERDE = '#8CC63E'
const NEGRO = '#333333'

const useStyles = makeStyles({
    root:{
        zIndex: 10,
        position:'fixed',
        marginLeft: 0,
        padding:0,
        width:'fit-content',
        height:'fit-content',
    },
    app:{
        zIndex: 1,
        height:50,
        position:'fixed',
        marginLeft: 0,
    },
    font:{
        maxWidth:'auto',
        fontFamily: 'Poppins',
        margin:3,
        color:'white',
    },
    Navicons:{
        display:'flex',
        flex: 1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    profileBox:{
        maxWidth:'auto',
        justifyContent:'flex-end',
    },
    link:{
        flexDirection:'row',
        textDecoration:'none',
        color:'gray',
        '&:hover': {
            color:'white',
            textDecoration:'none',
         },
         justifyContent:'center',
         alignSelf:'center',
    },
    icons:{
        color:'white',
        width:30,
        justifyContent: "center",
        paddingTop:0,
    },
    toolbar:{
        display:'flex',
    },
    grouplinks:{
        padding:0,
        display:'flex',
        color:'white',
        width:'100%',
        justifyContent:'flex-end'
    },
    item:{
        '&:hover': {
            color:'white',
            textDecoration:'none',
            backgroundColor:'transparent',
            cursor: 'pointer',
         },
         width:'fit-content',
         padding:0,

    },
    logout:{
        color: '#C2C2C2',
        '&:hover': {
            color:'white'
            
         },
    },
    text: {
        color: 'white'
    }



})


const AdminNavBar = (props) => {
    const classes = useStyles()
    const handleLogout = () =>   {
        props.sessionLogout(props.session.user);
        console.log('seee');
    }

    return(
    <Box component="div" displayPrint="none">
        <div className={classes.root}>
                <AppBar className={classes.app}>
                <Toolbar style={{backgroundColor:VIOLETA}}>
                     <Link to= '/admin/' className={classes.link}>
                                <ListItem className={classes.item}  disableRipple>
                                    <ListItemIcon className={classes.icons}>
                                            <PieChartIcon/>
                                        </ListItemIcon>
                                        <ListItemText className = {classes.text} primary='Panel'/>
                                </ListItem>
                        </Link>

                    <ListItem className={classes.item} disableRipple>
                         <Miembros/>
                     </ListItem>
                     <Link to= '/admin/clases' className={classes.link}>
                                <ListItem className={classes.item}  disableRipple>
                                    <ListItemIcon className={classes.icons}>
                                            <BookIcon/>
                                        </ListItemIcon>
                                        <ListItemText className = {classes.text} primary='Clases'/>
                                </ListItem>
                        </Link>
                     <ListItem className={classes.item} disableRipple>
                         <Gestion/>
                     </ListItem>

                <List className={classes.grouplinks}>
                    <Link to= '/admin/usuarios' className={classes.link}>
                                <ListItem className={classes.item} >
                                    <ListItemText className = {classes.text} primary={`Administrador`}/>
                                </ListItem>
                    </Link>
                    <Link to= '/' className={classes.link}>
                        <ListItem onClick={handleLogout} className={classes.grouplinks} button>
                            <ListItemIcon className={`${classes.icons} ${classes.logout}`} >
                                        <PowerSettingsNewIcon />
                                </ListItemIcon>
                        </ListItem>
                    </Link>
                </List>

                    </Toolbar>
                </AppBar>
        </div>
        </Box>
  )
}

const mapStateToProps = (state) => ({
	session: state.sessions.sessionUser
});

const mapDispatchToProps = (dispatch) => {
	return {
		sessionLogout: (data) => dispatch(sessionLogout(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavBar);
