import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

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

const inputStyle = {
  width: "100%",
  border: "none",
  padding: "4px",
  outline: "none",
  fontSize: "1.2em",
  fontFamily: 'inherit',
  resize: "none",
}

export default function FormDialog(props) {
  const [editorHtml, setHtml] = useState(props.content)
  const [note, setNote] = useState({
    title: props.title,
    content: props.content
  });

  useEffect(() => {
    setNote({
      title: props.title,
      content: props.content
    })

    setHtml(props.content)
  }, [])

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

  function submitNote() {
    props.onAdd(note, props.isImp);
    props.onDelete(props.id, props.isImp)
    props.handleClose()
  }

  var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  return (
    <div className="editNoteDialog">
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" fullWidth={true}
        maxWidth={w < 550 ? 'md' : 'sm'}>
        <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
        <DialogContent>
          <input
            name="title"
            onChange={handleChangeTitle}
            value={note.title}
            placeholder="Title"
            style={inputStyle}
          />

          <div className="tooltip-container-laptop">
          </div>

          <ReactQuill
            theme="bubble"
            onChange={handleChangeEditor}
            name="content"
            value={editorHtml}
            modules={modules}
            formats={formats}
            bounds={w < 550 ? '.tooltip-container-mobile' : '.tooltip-container-laptop'}
            placeholder="Edit a note..."
          />

          <div className="tooltip-container-mobile"/>

        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitNote} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
