import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleCancel}
        aria-labelledby="Delete Note"
        aria-describedby="are you sure you want to delete this note"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete this Note ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete note: <strong> {props.title}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleAgree} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
