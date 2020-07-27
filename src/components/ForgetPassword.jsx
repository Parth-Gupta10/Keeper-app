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
    marginTop: theme.spacing(8),
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


const ForgetPassword = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const value = useContext(firebaseContext);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const isInvalid = email === '';

  function handleChange(e) {
    const { value } = e.target;
    setEmail(value);
  }

  function handleSubmit(e) {
    value.firebase
    .resetPassword(email)
    .then(() => {
      setEmail('');
      setError('A mail has been sent to your email ID, please verify')
      history.push('/login');
      // props.history.replace('/home')
    })
    .catch(error => {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        setError('The email is not registered')
      } else {
        setError('Something went wrong, try again later')
      }
    });
    e.preventDefault();
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <i className="fas fa-lock"></i>
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
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
            value={email}
            autoComplete="email"
            onChange={handleChange}
            autoFocus
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
            Change Password
          </Button>
          <p style={{color: 'red', fontSize: '0.9rem'}}>
            {error}
          </p>
          <Grid container>
            <Grid item>
              <RouterLink to="/sign-up">
                Don't have an account? Sign Up
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default ForgetPassword;
