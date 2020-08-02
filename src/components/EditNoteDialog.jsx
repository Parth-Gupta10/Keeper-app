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
  fontSize: "1.1em",
  fontFamily: 'inherit',
  resize: "none",
  backgroundColor: "cornsilk",

}

export default function FormDialog(props) {
  const [editorHtml, setHtml] = useState(props.content)
  const [note, setNote] = useState({
    title: props.title,
    content: props.content
  });

  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    setNote({
      title: props.title,
      content: props.content
    })

    setHtml(props.content)
  }, [props.content, props.title, props.open])

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

  useEffect(() => {
    if (props.title === note.title && props.content === note.content) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [note])

  var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  return (
    <div className="editNoteDialog">
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" fullWidth={true}
        maxWidth={w < 550 ? 'md' : 'sm'}>
        <DialogTitle id="form-dialog-title" style={{color: 'Brown'}}>Edit Note</DialogTitle>
        <DialogContent>


          <div className="tooltip-container-laptop">
            <label htmlFor='#title' style={{color: 'darkgoldenrod', fontWeight: '600'}}> Enter new Title: </label>
            <input
              id="title"
              name="title"
              onChange={handleChangeTitle}
              value={note.title}
              placeholder="Title"
              style={inputStyle}
            />

          <label htmlFor='#content' style={{color: 'darkgoldenrod', fontWeight: '600'}}> Enter new Content: </label>

            <ReactQuill
              id="content"
              theme="bubble"
              onChange={handleChangeEditor}
              name="content"
              value={editorHtml}
              modules={modules}
              formats={formats}
              bounds={w < 550 ? '.tooltip-container-laptop' : '.tooltip-container-laptop'}
              placeholder="Edit a note..."
              style={{backgroundColor: "cornsilk"}}
            />
          </div>

          <div className="tooltip-container-mobile"/>

        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} style={{color: '#ce7014'}}>
            Cancel
          </Button>
          <Button onClick={submitNote} style={{color: '#ce7014'}} disabled={isDisabled}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
