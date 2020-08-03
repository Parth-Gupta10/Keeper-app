import React, {useState} from "react";
import DialogBox from './DialogBox';
import EditNoteDialog from './EditNoteDialog';
import Tooltip from '@material-ui/core/Tooltip';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

function Note(props) {

  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleCancel() {
    setAgree(false);
    handleClose();
  }

  function handleAgree() {
    setAgree(true);
    handleClose();
    handleDelete();
  }

  function handleDelete() {
    props.onDelete(props.id, props.isImp);
    setAgree(false);
  }

  function handleClick() {
    props.onImp(props.id, props.isImp)
  }

  return (
    <div className="note" style={props.isImp ? {background: '#fff2cc'} : {background: 'white'}}>
      <h1>{props.title}</h1>
      <ReactQuill
        theme="bubble"
        name="content"
        value={props.content}
        readOnly
      />

      <Tooltip title="Delete">
        <button onClick={handleClickOpen}>
          <i className="fas fa-trash"></i>
        </button>
      </Tooltip>

      <DialogBox
        open={open}
        handleCancel={handleCancel}
        handleAgree={handleAgree}
        title={props.title}
      />

    <Tooltip title={!props.isImp ? "Mark Important" : "Unmark Important"}>
        <button onClick={handleClick} style={{marginTop: '2.1px'}}>
          <i className="fas fa-thumbtack"></i>
        </button>
      </Tooltip>

      <Tooltip title="Edit">
        <button onClick={handleClickOpenEdit}>
          <i className="fas fa-edit"></i>
        </button>
      </Tooltip>

      <EditNoteDialog
        open={openEdit}
        handleClickOpen={handleClickOpenEdit}
        handleClose={handleCloseEdit}
        id={props.id}
        content={props.content}
        title={props.title}
        isImp={props.isImp}
        onAdd={props.addNote}
        onDelete={props.onDelete}
      />
    </div>
  );
}

export default Note;
