import React from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

function Note(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
        <ReactQuill
          theme="bubble"
          name="content"
          value={props.content}
          readOnly
        />
      <button onClick={handleClick}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default Note;
