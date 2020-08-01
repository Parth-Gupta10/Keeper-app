import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {firebaseContext} from '../context';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  const value = useContext(firebaseContext);

  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const isInvalid = input.password === '' || input.email === '';

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value
      }
    });
  }

  function handleSubmit(e) {
    value.firebase
    .signInUser(input.email, input.password)
    .then(() => {
      setInput({
        email: '',
        password: '',
      });
      history.push('/')
      // props.history.replace('/home')
    })
    .catch(error => {
      console.log(error);
      if (error.code === 'auth/wrong-password') {
        setError('The password entered is wrong')
      } else if (error.code === 'auth/user-not-found') {
        setError('The email is not registered')
      } else if (error.code === 'auth/too-many-requests') {
        setError(error.message)
      } else {
        setError('Something went wrong, try again later')
      }
    });
    e.preventDefault();
  }

  if (value.isUserAuth) {
    return (
      <div className={classes.paper} style={{margin: 'auto'}}>
        <Typography component="h1" variant="h5">
          You are already logged in. Continue to
          <RouterLink to="/notes" style={{marginLeft: '3px'}}>
             Your Notes
          </RouterLink>
        </Typography>
      </div>
    );
  } else {

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <i className="fas fa-lock"></i>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={input.email}
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={input.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <p style={{color: 'red', fontSize: '0.9rem'}}>
              {error}
            </p>
            <Grid container>
              <Grid item xs>
                <RouterLink to="/forget-password" variant="body2">
                  Forgot password?
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/sign-up">
                  Don't have an account? Sign Up
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default SignIn;
