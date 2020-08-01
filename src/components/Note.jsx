import React, {useState} from "react";
import DialogBox from './DialogBox';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

function Note(props) {

  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false)

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

      <button onClick={handleClickOpen}>
        <i className="fas fa-trash"></i>
      </button>

      <DialogBox
        open={open}
        handleCancel={handleCancel}
        handleAgree={handleAgree}
        title={props.title}
      />

      <button onClick={handleClick} style={{marginTop: '2.1px'}}>
        <i className="fas fa-thumbtack"></i>
      </button>
    </div>
  );
}

export default Note;
