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

  const [impNotes, setImpNotes] = useState([]);

  useEffect(() => {
    let tempNotes = [];
    let tempImpNotes = [];

    value.firebase.getNotesFromDB()
    .then((doc) => {
      if (doc.exists) {
        doc.data().note.forEach((item, i) => {
          tempNotes.push(item);
        });

        doc.data().impNote.forEach((item, i) => {
          tempImpNotes.push(item);
        });

        console.log('tempNotes: ', tempNotes );
        console.log('tempImpNotes: ', tempImpNotes);
      } else {
        console.log('No such doc exists');
      }
    })
    .then(() => {
      setNotes(tempNotes);
      setImpNotes(tempImpNotes);
      setIsLoading(false);
    })
    .catch((err) => {
      if (err.toString().indexOf("FirebaseError: Failed to get document because the client is offline.") >= 0) {
        console.log('No internet Connection');
      } else {
        console.log(err);
      }
    });

  }, [])

  function addNote(newNote, isImp) {
    console.log(isImp);

    if (isImp) {
      setImpNotes(prevNotes => {
        let allImpNotes = [
          ...prevNotes,
          newNote
        ];
        return allImpNotes
      })

    } else {
      setNotes(prevNotes => {
        let allNotes = [
          ...prevNotes,
          newNote
        ];
        return allNotes
      })
    }
  }

  function deleteNote(id, isImp) {
    if (isImp) {
      setImpNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });

    } else {

      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }
  }

  function impNote(id, isImp) {
    if (isImp) {
      setNotes(prevNotes => {
        return [
          ...prevNotes,
          impNotes[id]
        ]
      })
      deleteNote(id, isImp);

    } else {

      setImpNotes(prevNotes => {
        return [
          ...prevNotes,
          notes[id]
        ]
      })
      deleteNote(id, isImp);
    }
  }

  useEffect(() => {
    if (notes.length > 0 || impNotes.length > 0) {
      value.firebase
      .addNoteToDB(notes, impNotes)
      .catch(err => console.log(err))
    }

    if (notes.length === 0 && !isLoading) {
      value.firebase
      .addNoteToDB([], impNotes)
      .catch(err => console.log(err))
    }

  }, [notes, impNotes]);

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
        impNotes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              onImp={impNote}
              isImp={true}
              addNote={addNote}
            />
          )
        })
      }
      {
        notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              onImp={impNote}
              isImp={false}
              addNote={addNote}
            />
          );
        })
      }
      </>
    );
  }
}


export default NoteList;
