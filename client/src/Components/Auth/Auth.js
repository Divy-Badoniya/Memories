import { Avatar, Container, Paper, Typography, Grid, Button } from '@material-ui/core'
// import { GoogleLogin } from "react-google-login"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import React, { useState } from 'react'
import Input from './Input'
import useStyles from './styles'
// import Icon from './icon'
import { useDispatch } from "react-redux"
import { signIn, signUp } from '../../Actions/auth'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        isSignUp ? dispatch(signUp(formData, navigate)) : dispatch(signIn(formData, navigate)) 
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    // const googleSuccess = async (res) => {
    //     console.log(res)
    // }

    // const googleFailure = async (error) => {
    //     console.log(error)
    //     console.log("Google Failed")
    // }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Repeat password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    {/* <GoogleLogin
                        clientId="54978584814-unjpbffm2817k4046hoqsd6hd344sisr.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button color="primary" fullWidth variant="contained" 
                            className={classes.googleButton}
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} startIcon={<Icon />} >
                                Google Sign In
                            </Button>
                        )} 
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                </form>
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? "Already Have an Account. Sign In" : "Don't have an Account. Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Auth