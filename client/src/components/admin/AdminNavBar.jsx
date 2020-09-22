import React from 'react'
import {Link} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { connect } from 'react-redux';
import { sessionLogout } from '../../redux/actions/session';


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
        margin:5,
    },
    Navicons:{
        display:'flex',
        flex: 1,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    profileBox:{
        maxWidth:'auto',
        justifyContent:'flex-end',
    },
    link:{
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
        props.sessionLogout(props.session)
    }
    return(
        <div className={classes.root}>
                <AppBar className={classes.root}>
                    <Toolbar>
                    <Typography className={classes.font} variant='h6'>
                            El Potrero / Panel de Admin
                     </Typography>
                    <List className={classes.Navicons}>
                            <ListItem className={classes.profileBox} button>
                                <Typography className={classes.font} variant='h6'>
                                    {`${props.session.firstName} ${props.session.lastName}`}
                                </Typography>
                                <ListItemIcon >
                                    <AccountBoxIcon/> 
                                </ListItemIcon>           
                                    </ListItem>

                            <Link to= '/' className={classes.link}>
                                    <ListItem onClick={handleLogout} button>
                                        <ListItemIcon >
                                                <PowerSettingsNewIcon/> 
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

