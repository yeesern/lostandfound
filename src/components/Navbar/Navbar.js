import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Typography, Toolbar, Button  } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { useCallback } from 'react';
import flashpoint from '../../images/flashpoint.jpg';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';


const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const classes = useStyles();

    const logout = useCallback(() => {
        dispatch({ type: actionType.LOGOUT });
    
        navigate('/auth');
    
        setUser(null);
    }, [dispatch, navigate]);
    
    useEffect(() => {
        const token = user?.token;
        
        if (token) {
          const decodedToken = decode(token);
        
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, 
    
    [location, logout, user?.token]);
    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className = {classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center">Company Lost & Found Report Site</Typography><img className={classes.image} src={flashpoint} alt="flashpoint" height="70"/>
        </div>
        <Toolbar className={classes.toolbar}>
            {user?.result ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained"className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>

            ) : (

                    <div>
                      <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                      </Button>
          
                      {/* <Button component={Link} to="/admin-auth" variant="contained" color="secondary">
                        Admin Sign In
                      </Button> */}
                    </div>
                  )}
                </Toolbar>
              </AppBar>
            );
          };
          

export default Navbar;

