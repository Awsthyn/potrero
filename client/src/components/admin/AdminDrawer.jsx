import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import {Link,useHistory} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Icon from '@material-ui/core/Icon';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PieChartIcon from '@material-ui/icons/PieChart'
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import Miembros from './MenuItemMiembros';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import HomeIcon from '@material-ui/icons/Home';
import { sessionLogout } from '../../redux/actions/session';

import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarsTwoToneIcon from '@material-ui/icons/StarsTwoTone';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded';
import PieChartRoundedIcon from '@material-ui/icons/PieChartRounded';
import logo from './assets/logo.png';
import AssistantIcon from '@material-ui/icons/Assistant';
import SettingsIcon from '@material-ui/icons/Settings';
import BookIcon from '@material-ui/icons/Book';

const drawerWidth = 240;

const VIOLETA = '#492BC4'
const VERDE = '#8CC63E'
const NEGRO = '#333333'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height:100,
    // position:'fixed',
    // marginLeft: 0,
  },
 
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,

    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
    marginLeft:'auto',
    padding:0,
    display:'flex',
    color:'white',
    width:'fit-content',
    alignSelf: 'center',
    marginRight:0,

},
item:{
    padding:0,
},

settings:{
  '&:hover': {
      variant:'raised',
      backgroundColor:'gray',
      paddingTop:5,
    },
    
  },

logout:{
  '&:hover': {
     variant:'raised',
      backgroundColor:'red',
      paddingTop:5,
      paddingBottom:10,
    },
    
  },

}));



function AdminDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () =>   {
    props.sessionLogout(props.session);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{backgroundColor:VIOLETA}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Panel de Admin
          </Typography>

                        <List className={classes.grouplinks}>
                              <ListItem onClick={''} className={classes.grouplinks} button>
                                   <ListItemIcon className={`${classes.icons} ${classes.settings}`} >
                                           <SettingsIcon/>
                                      </ListItemIcon>
                              </ListItem>
                                
                            <ListItem  >
                                <ListItemText className={classes.grouplinks} primary={`${props.session.firstName} ${props.session.lastName}`}/>
                            </ListItem>
                                            
                            <Link style={{alignSelf:'center'}} className={classes.link} to= '/'>
                                    <ListItem onClick={handleLogout} className={classes.grouplinks} button>
                                    <ListItemIcon className={`${classes.icons} ${classes.logout}`} >
                                                    <PowerSettingsNewIcon />
                                            </ListItemIcon>
                                    </ListItem>
                            </Link> 
                                        
                        </List>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
              <List>
                    <ListItem onClick={() => history.push(`/admin`)}  button>
                        <ListItemIcon className={classes.link} >
                        <img style={{height:30,width:30}} src={logo} alt="" />
                        </ListItemIcon>
                        <ListItemText className={classes.link} primary={'El Potrero'} />
                    </ListItem>
              </List>
        <Divider />
        <List>
          
                 <ListItem onClick={() => history.push(`/admin`)} button >
                    <ListItemIcon className={classes.link} ><PieChartRoundedIcon/></ListItemIcon>
                    <ListItemText className={classes.link} primary={'Panel'} />
                  </ListItem>

                  <ListItem onClick={() => history.push(`/admin/voluntarios`)} button > 
                    <ListItemIcon className={classes.link}><AssistantIcon/></ListItemIcon>
                    <ListItemText className={classes.link} primary={'Voluntarios'} />
                  </ListItem>

                  <ListItem onClick={() => history.push(`/admin/estudiantes`)} button >
                    <ListItemIcon className={classes.link}><LocalLibraryIcon/></ListItemIcon>
                    <ListItemText className={classes.link} primary={'Estudiantes'} />
                  </ListItem>

                  <ListItem onClick={() => history.push(`/admin/usuarios`)} button >
                    <ListItemIcon className={classes.link}> <SupervisedUserCircleRoundedIcon/></ListItemIcon>
                    <ListItemText className={classes.link} primary={'Asesores'} />
                  </ListItem>


                  <ListItem onClick={() => history.push(`/admin/materias`)} button >
                    <ListItemIcon className={`${classes.link}`}><BookIcon/></ListItemIcon>
                    <ListItemText className={classes.link} primary={'Clases'} />
                  </ListItem>
                  
                  <ListItem onClick={() => history.push(`/admin/materias`)} button >
                    <ListItemIcon className={`${classes.link}`}><SettingsApplicationsRoundedIcon/></ListItemIcon>
                    <ListItemText className={classes.link} primary={'Gestion'} />
                  </ListItem>

        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}


const mapStateToProps = (state) => ({
	session: state.sessions.sessionUser
});

const mapDispatchToProps = (dispatch) => {
	return {
		sessionLogout: (data) => dispatch(sessionLogout(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDrawer)