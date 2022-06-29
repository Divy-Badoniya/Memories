import { InputAdornment, Grid, TextField, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from "@material-ui/icons"
import React from 'react'

const Input = ({ half, name, label, autoFocus, type, handleChange, handleShowPassword}) => {
    return (
        <Grid item xs={6} sm={half ? 6 : 12}>
            <TextField 
                required
                fullWidth
                name={name}
                onChange={handleChange}
                variant="outlined"
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input