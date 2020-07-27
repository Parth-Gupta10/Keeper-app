import React, {useState, useContext} from 'react';
import Note from "./Note";
import CreateArea from "./CreateArea";
import {useHistory} from 'react-router-dom';
import {firebaseContext} from '../context';

const NoteList = (props) => {
  const value = useContext(firebaseContext);
  const [notes, setNotes] = useState([]);
  const history = useHistory();

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  if (!value.isUserAuth) {
    history.push('/login');
    return null;
  } else {
    return (
      <>
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </>
    );
  }
}

export default NoteList;
