import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PieChartIcon from '@material-ui/icons/PieChart'
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
        maxWidth:30,
        maxHeight:30,
    },
    toolbar:{
        display:'flex',
    },
    grouplinks:{
        display:'row',
        color:'white',
        position:'flex-end',
        alignItems:'center',
        width:200
    }

})


const AdminNavBar = (props) => {
    const classes = useStyles()
    const handleLogout = () =>   {
        props.sessionLogout(props.session)
    }
    return(
        <div className={classes.root}>
                <AppBar className={classes.root}>
                    <Toolbar >
                    <ListItem button>
                        <Typography  variant='h6' >
                            <ListItemIcon >
                                    Panel <PieChartIcon /> 
                            </ListItemIcon>   
                        </Typography>
                     </ListItem>
                    <List className={classes.grouplinks} >
                            <ListItem className={classes.icon} button>
                                <Typography className={classes.font} variant='h6' >
                                        <ListItemIcon >
                                            {`${props.session.firstName} ${props.session.lastName}`} <AccountBoxIcon className={classes.icon} />  
                                                <ListItem onClick={handleLogout} className={classes.icon} button>
                                                    <ListItemIcon >
                                                            <PowerSettingsNewIcon className={classes.icon}/>
                                                    </ListItemIcon>           
                                                </ListItem> 
                                        </ListItemIcon>  
                                        <Link to= '/' className={classes.link}>
                                        
                                         </Link>
                                </Typography>
                            </ListItem>

                            
                                  
                          
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

