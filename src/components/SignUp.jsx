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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const value = useContext(firebaseContext);

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const isInvalid = input.password === '' || input.email === '' || input.firstName === '';

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
    .registerUser(input.email, input.password)
    .then(() => {
      value.firebase
      .updateUserName(input.firstName)
      .catch(err => {
        console.log(err);
      })
    })
    .then(() => {
      value.firebase
      .addUserToDB(input.firstName, input.lastName, input.email)
      .catch((err) => console.log(err))
    })
    .then(() => {
      setInput({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
      history.push('/')
      // props.history.replace('/home')
    })
    .catch(error => {
      console.log(error);
      if (error.code === 'auth/weak-password') {
        setError('Password should be atleast 6 characters')
      } else if (error.code === 'auth/email-already-in-use') {
        setError('The email is already used by another account')
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email ID')
      } else {
        setError('Something went wrong, try again later')
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <i className="fas fa-lock"></i>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onClick={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={input.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={input.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={input.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={input.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
            onClick={(e) => handleSubmit()}
          >
            Sign Up
          </Button>
          <p style={{color: 'red', fontSize: '0.9rem'}}>
            {error}
          </p>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/login">
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
