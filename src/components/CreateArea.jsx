import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [editorHtml, setHtml] = useState('')

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleChangeEditor(html) {
    setHtml(html);

    setNote(prevNote => {
      return {
        ...prevNote,
        content: editorHtml
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    setHtml('');
    event.preventDefault();
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
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

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

// <textarea
//   name="content"
//   onClick={expand}
//   onChange={handleChange}
//   value={note.content}
//   placeholder="Take a note..."
//   rows={isExpanded ? 3 : 1}
// />
