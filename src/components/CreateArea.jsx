import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Snackbar from "./Snackbar";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [editorHtml, setHtml] = useState('')
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isImp, setIsImp] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleUndo = (e) => {
    setOpen(false);
    e.preventDefault();
    setIsImp(!isImp);
  }

  function handleChangeTitle(event) {
    const { value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        title: value
      };
    });
  }

  function handleChangeEditor(html) {
    setHtml(html);
  }

  useEffect(() => {

    setNote(prevNote => {
      return {
        ...prevNote,
        content: editorHtml
      };
    });

  }, [editorHtml])

  function submitNote(event) {
    props.onAdd(note, isImp);
    setNote({
      title: "",
      content: ""
    });
    setHtml('');
    setIsImp(false);
    event.preventDefault();
  }

  function makeImp(e) {
    setIsImp(!isImp);
    e.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, {'color': []}],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, ],
      ['link'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }

  const formats = [
    'header', 'font', 'size', 'color',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'background',
    'link', 'script'
  ]

  return (
    <div>
      <form className="create-note" style={isImp ? {background: '#fff2cc'} : {background: 'white'}}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChangeTitle}
            value={note.title}
            placeholder="Title"
            style={isImp ? {background: '#fff2cc'} : {background: 'white'}}
          />
        )}

        <Zoom in={isExpanded}>
          <button onClick={(e) => {makeImp(e); handleClick();}} className="impBtn">
            <i className="fas fa-thumbtack"></i>
          </button>
        </Zoom>

        <Snackbar
          message={isImp ? "Marked Important" : "Unmarked Important"}
          open={open}
          handleClose={handleClose}
          handleUndo={handleUndo}
        />

        <ReactQuill
          theme="bubble"
          onChange={handleChangeEditor}
          name="content"
          value={editorHtml}
          modules={modules}
          formats={formats}
          onFocus={expand}
          bounds={'.create-note'}
          placeholder="Take a note..."
        />

        <Zoom in={isExpanded} className="addBtn">
          <Fab onClick={submitNote}>
            <i className="fas fa-plus"></i>
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
