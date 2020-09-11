import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NoteView from "./NoteView";

import { getNotes } from "../../actions/noteActions";

import NoteItem from './NoteItem'

function NotesList({ getNotes, note }) {
  const [notesList, setNotesList] = useState();
  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const { notes } = note;
  //   console.log(new Date(notes[0].date))
  // const { isAuthenticated } = note
  return (
    <div>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  note: state.note,
  auth: state.auth,
});
export default connect(mapStateToProps, { getNotes })(NotesList);
