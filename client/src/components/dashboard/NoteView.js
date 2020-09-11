import React, { useState, useEffect } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";

import Chip from "@material-ui/core/Chip";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import {
  addNote,
  getNote,
  removeNote,
  deleteNote,
} from "../../actions/noteActions";
import { set } from "mongoose";

function NoteView(props) {
  const { view, editing, viewedNote } = props;
  const { noteId } = props.match.params;
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState({
    category: "",
    text: "",
  });

  useEffect(() => {
    setIsLoading(true);
    if (view) {
      props.getNote(noteId);
    }

    return () => {
      props.removeNote();
      setNote({ text: "", category: "" });
    };
  }, []);

  useEffect(() => {
    setNote({
      category: props.note.note.category,
      text: props.note.note.text,
    });
    setIsLoading(false);
  }, [props.note]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = note;

    props.addNote(newNote);

    setNote({ category: "", text: "" });
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleDelete = (e) => {
    props.deleteNote(noteId);
    props.history.push("/dashboard");
  };

  return (
    <div className="container" style={{ marginTop: "2em" }}>
      <Link to="/dashboard" className="btn-flat waves-effect">
        <Button>
          <ArrowBackIcon />
          Back to dashboard
        </Button>
      </Link>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <div style={{ marginTop: "1.25em" }}>
            <Chip size="small" label={note.category} color="primary" />
          </div>
          <p style={{ whiteSpace: "pre-wrap" }}>{note.text}</p>
          <div style={{ margin: "2em 0", float: "right" }}>
            <ButtonGroup variant="contained" color="primary">
              <Link to={`/notes/${noteId}/edit`}>
                <Button color="primary" startIcon={<EditIcon />}>
                  Edit
                </Button>
              </Link>
              <Button
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                delete
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  note: state.note,
});
export default connect(mapStateToProps, {
  addNote,
  getNote,
  removeNote,
  deleteNote,
})(NoteView);
