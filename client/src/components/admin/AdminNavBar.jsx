import React from 'react'
import { connect } from 'react-redux';
import {Link,Redirect,Route} from 'react-router-dom';
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

const VIOLETA = '#492BC4'
const VERDE = '#8CC63E'
const NEGRO = '#333333'

const useStyles = makeStyles({
    root:{
        height:50,
        background: VIOLETA,
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
            color:VIOLETA,
            textDecoration:'none',
         },
    },
    icons:{
        color:'white',
        paddingTop:0,
        justifyContent:'center',
        maxWidth:30,
        maxHeight:30,
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
        padding:0,
    },
    link:{
        padding: 0,
        textDecoration:'none',
        color:'gray',
        '&:hover': {
            color:VIOLETA,
            textDecoration:'none',
         },
    },

})


const AdminNavBar = (props) => {
    const classes = useStyles()

    const handleLogout = () =>   {
        props.sessionLogout(props.session);
        console.log('seee');
    }

    return(
        <div className={classes.root}>
                <AppBar className={classes.root}>
                    <Toolbar  >
                  
                     <Link to= '/admin/' className={classes.link}>
                                <ListItem className={classes.item} button>
                                    <ListItemText primary='Panel'/>
                                    <ListItemIcon className={classes.icons}>
                                            <PieChartIcon/>
                                        </ListItemIcon>
                                </ListItem>
                    </Link> 

                    <ListItem className={classes.item} button><Miembros/></ListItem>
                  

                <List className={classes.grouplinks}>
                    <Link to= '/admin/usuarios' className={classes.link}>
                                <ListItem className={classes.item} >
                                    <ListItemText primary={`${props.session.firstName} ${props.session.lastName}`}/>
                                </ListItem>
                    </Link> 
                    <Link to= '/' className={classes.link}>
                        <ListItem onClick={handleLogout} className={classes.grouplinks} button>
                            <ListItemIcon className={classes.icons} >
                                        <PowerSettingsNewIcon />
                                </ListItemIcon>
                        </ListItem>
                    </Link> 
                </List>

                    </Toolbar>
                </AppBar>
               
                
        </div>
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

