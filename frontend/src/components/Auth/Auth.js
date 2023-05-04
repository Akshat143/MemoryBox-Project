import React,{ useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { signin, signup } from '../../actions/auth.js';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles.js';
import Input from './Input.js';
// import Icon from './icon.js';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [ showPassword, setShowPassword] = useState(false);
  const [ isSignup, setIsSignup] = useState(false);
  const [ formData, setFormData ] = useState(initialState);
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const googleSuccess = async (res) => {
    // console.log(res);
    const result = jwt_decode(res?.credential);
    // console.log(res?.credential);
    // const token = res?.tokenId;

    try {
        dispatch({ type: 'AUTH', data: { result }});
        history.push('/');
    } catch (error) {
        console.log(result);
    }
  };

  const googleError = () => {
    console.log('Google Sign In was unsuccessful. Try again later');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    if (isSignup){
      dispatch(signup(formData,history));
    }else{
      dispatch(signin(formData,history));
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={5}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign in'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSignup && (
                  <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                  { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" /> }
            </Grid>
              <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                  { isSignup ? 'Sign Up' : 'Sign In' }
              </Button>

              <GoogleLogin
                  // render={(renderProps) => (
                  // <Button className={`${classes.googleButton} ${classes.fullWidthButton}`} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  //   Sign in with Google
                  // </Button>
                  // )} 
                  onSuccess={googleSuccess}
                  onError={googleError}
                  type="standard"
                  theme="outlined"
                  text="continue_with"
                  cookiePolicy="single_host_origin"
                  fullWidth
              />

          <Grid container justifyContent="flex-end" className={classes.item}>
            <Grid item>
              {isSignup ? (
                <Typography variant="body2" align="right">
                  Already have an account?{' '}
                  <Link to="/auth" onClick={switchMode} color="primary">
                    Log in
                  </Link>
                </Typography>
              ) : (
                <Typography variant="body2" align="right">
                  Don't have an account?{' '}
                  <Link to="/auth" onClick={switchMode} color="primary">
                    Sign up
                  </Link>
                </Typography>
              )}
            </Grid>
          </Grid>
          </form>
        </Paper>
      </Container>
  );
};

export default Auth;
