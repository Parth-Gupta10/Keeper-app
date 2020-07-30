import React, {useState, useContext, useEffect} from 'react';
import Note from "./Note";
import CreateArea from "./CreateArea";
import {firebaseContext} from '../context';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70% !important',
    color: '#f5ba13'
  },
}));

const NoteList = (props) => {
  const classes = useStyles();

  const value = useContext(firebaseContext);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let tempNotes = [];

    value.firebase.getNotes()
    .then((doc) => {
      if (doc.exists) {
        doc.data().note.forEach((item, i) => {
          tempNotes.push(item);
        });

        console.log('tempNotes: ', tempNotes );
      } else {
        console.log('No such doc exists');
      }
    })
    .then(() => {
      setNotes(tempNotes);
      setIsLoading(false);
      console.log('notes: ', notes);
    })
    .catch(err => console.log(err));

  }, [])

  function addNote(newNote) {
    setNotes(prevNotes => {
      let allNotes = [
        ...prevNotes,
        newNote
      ];
      return allNotes
    })
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  useEffect(() => {
    if (notes.length > 0) {
      value.firebase
      .addNote(notes)
      .catch(err => console.log(err))
    }

    if (notes.length === 0 && !isLoading) {
      value.firebase
      .addNote([])
      .catch(err => console.log(err))
    }

  }, [notes]);

  if (isLoading) {

    return (
      <div className={classes.alignItemsAndJustifyContent}>
        <CircularProgress />
      </div>
    );

  } else {

    return (
      <>
      < CreateArea onAdd = {addNote} />
      {
        notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              />
          );
        })
      }
      </>
    );
  }
}


export default NoteList;
