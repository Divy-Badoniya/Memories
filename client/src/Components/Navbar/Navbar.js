import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import memoriesText from "../../Images/memories-Text.png";
import memoriesLogo from "../../Images/memories-Logo.png"
import useStyles from "./styles"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        setUser(null)
        navigate('/auth')
    }

    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="Memories" height="45px" />
                <img src={memoriesLogo} className={classes.image} alt="Icon" height="40" ></img>
            </Link>
            <Toolbar>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageURL}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>LogOut</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar