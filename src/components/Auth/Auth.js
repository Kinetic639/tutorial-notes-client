import React, {useState} from "react";
import GoogleIcon from '@mui/icons-material/Google';
import useStyles from './styles'
import {Avatar, Button, Container, Grid, Paper} from "@mui/material";
import {LockOutlined} from "@material-ui/icons";
import Typography from "@mui/material/Typography";
import {Input} from "./Input";
import GoogleLogin from "react-google-login";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {signin, signup} from '../../actions/auth';
import {AUTH} from '../../constants/actionTypes';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

export const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [isSignedUp, setIsSignedUp] = useState(false)
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setFormData(initialState);
        setIsSignedUp((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignedUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: AUTH, data: {result, token}});

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = () => alert('Google Sign In was unsuccessful. Try again later');

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    return (
        <Container component='main' maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant='h5'>{isSignedUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{marginBottom: '15px'}}>
                        {
                            isSignedUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus
                                           half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half xs={6}/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange}
                               type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignedUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}
                                              type={showPassword ? "text" : "password"}
                                              handleShowPassword={handleShowPassword}/>}
                    </Grid>

                    <Button type="submit" sx={{margin: "20px 0"}} fullWidth variant="contained" color="primary"
                            className={classes.submit}>
                        {isSignedUp ? "Sign Up" : "Sign in"}
                    </Button>

                    <GoogleLogin clientId="454897998498-artbcv42hv9geua266dqvl0jj45pm09m.apps.googleusercontent.com"
                                 render={(renderProps) => (
                                     <Button className={classes.googleButton} color="primary" fullWidth
                                             onClick={renderProps.onClick}
                                             disabled={renderProps.disabled} startIcon={<GoogleIcon/>}
                                             variant="contained">Google
                                         Sign
                                         In</Button>
                                 )}
                                 onSuccess={googleSuccess}
                                 onFailure={googleFailure}
                                 cookiePolicy="single_host_origin"

                    />

                    <Grid container justify="flex-end" className={classes.switchModeBtn}>
                        <Button onClick={switchMode}>
                            {isSignedUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )

}
