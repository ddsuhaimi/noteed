import React, { useState, useEffect } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import UpdateIcon from "@material-ui/icons/Update";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";

import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { addNote, getNote, removeNote, editNote } from "../../actions/noteActions";
import { set } from "mongoose";

function NoteForm(props) {
  const { noteId } = props.match.params;
  const [edit, setEdit] = useState(false);
  const [note, setNote] = useState({});
  useEffect(() => {
    if (noteId) {
      setEdit(true);
      props.getNote(noteId);
    }
    return () => {
      props.removeNote();
      setNote({ text: "", category: "" });
    };
  }, []);

  useEffect(() => {
    if (noteId) {
      setNote({
        category: props.note.note.category,
        text: props.note.note.text,
      });
    }
  }, [props.note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      text: note.text,
      category: note.category
    }
    if (edit) {
      props.editNote(noteId, newNote)
      props.history.push("/dashboard")
    } else {
      props.addNote(newNote);
      props.history.push("/dashboard")
    }
    setNote({ category: "", text: "" });
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  return (
    <div className="container" style={{ marginTop: "2em" }}>
      <Link to="/dashboard" className="btn-flat waves-effect">
        <Button>
          <ArrowBackIcon />
          Back to dashboard
        </Button>
      </Link>
      <div
        className="col s12"
        style={{ paddingLeft: "11.250px", marginTop: "1.25em" }}
      >
        <Typography variant="h4">
          <b>{edit ? "Edit" : "Add"}</b> note
        </Typography>
      </div>
      <form
        style={{ paddingLeft: "11.250px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={handleChange}
          fullWidth
          required
          value={note.category}
          id="category"
          name="category"
          type="text"
          label="Category"
          margin="normal"
        />
        <TextField
          onChange={handleChange}
          multiline={true}
          value={note.text}
          size="medium"
          rows={15}
          fullWidth
          required
          id="text"
          name="text"
          type="text"
          label="Text"
          margin="normal"
        />

        <div style={{ marginTop: "2em", float: "right" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={edit ? <UpdateIcon /> : <AddBoxIcon />}
            // onClick={handleAddUpdate}
          >
            {edit ? 'Update ' : 'Add '} note
          </Button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  note: state.note,
});
export default connect(mapStateToProps, { addNote, getNote, removeNote, editNote })(
  NoteForm
);
