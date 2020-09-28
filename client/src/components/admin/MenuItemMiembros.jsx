import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import Link from '@material-ui/core/Link';
import {Link as Linked,useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AssistantIcon from '@material-ui/icons/Assistant';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';



const VIOLETA = '#492BC4'
const VERDE = '#8CC63E'
const NEGRO = '#333333'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    "&:hover": {
      backgroundColor: "transparent"
    },
    padding: 0,
  },
  paper: {
    marginRight: theme.spacing(0),
  },
  link:{
    flexDirection:'row',
    textDecoration:'none',
    color:'gray',
    '&:hover': {
        color:'white',
        textDecoration:'none',
     },
  },



icons:{
  disableRipple: true, 
  color:'white',
  paddingTop:0,
  justifyContent:'center',
  maxWidth:30,
  maxHeight:30,
  width: 'fit-content',
  height: 'fit-content',
  '&:hover': {
    textDecoration:'none',
    color:'white',
    background: 'none',
    backgroundColor:'transparent'
 },
},
menuitem:{
  color:NEGRO,
  padding:3,
  margin:1,
  justifyContent:'center',
  width: 'fit-content',
  height: 'fit-content',
  '&:hover': {
    textDecoration:'none',
    color:VIOLETA,
    background: 'none',
    backgroundColor:'transparent'
 },
},


item:{
  color:'gray',
  padding:0,
  justifyContent:'center',
  width: 'fit-content',
  height: 'fit-content',
  '&:hover': {
    textDecoration:'none',
    color:'white',
    background: 'none',
    backgroundColor:'transparent'
 },
},
font:{
  maxWidth:'auto',
  fontFamily: 'Poppins'
},
  }));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const history = useHistory();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event,route) => {
  if(route === 'estudiantes'|| route === 'usuarios')  history.push(`/admin/${route}`)
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root} >
        <Link 
    
          className={classes.link}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          
                <ListItem className={classes.item} >
                     <ListItemIcon  className={classes.icons}>
                         <SupervisedUserCircleRoundedIcon /> 
                                </ListItemIcon >
                         <ListItemText className={classes.font} primary='Miembros'/>
                 </ListItem>
        </Link >

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem  className={classes.menuitem} onClick={e => handleClose(e,'estudiantes')}><LocalLibraryIcon/>  Estudiantes</MenuItem>
                    <MenuItem  className={classes.menuitem} onClick={e => handleClose(e,'usuarios')}><SupervisedUserCircleRoundedIcon/>  Asesores</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
}