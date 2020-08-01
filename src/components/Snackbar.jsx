import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default function SimpleSnackbar(props) {

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.open}
        autoHideDuration={5000}
        onClose={props.handleClose}
        message={props.message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={props.handleUndo}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
              <i className="fas fa-times" fontSize="small"></i>
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
