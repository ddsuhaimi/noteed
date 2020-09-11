import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import NotesList from "./NotesList";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { logoutUser } from "../../actions/authActions";

function Dashboard(props) {
  const [user, setUser] = useState(props.auth.user);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const onLogOutClick = (event) => {
    event.preventDefault();

    props.logoutUser();
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <Typography variant="h3" style={{ margin: "0.5em 0 0.2em" }}>
            <b>Hey there,</b> {user.name.split(" ")[0]}
          </Typography>
          <Typography color="textSecondary" variant="h6">
            Have something in mind? Why don't create a note?
          </Typography>
          <div style={{ margin: "0.5em 0" }}>
            <Link to="/notes/new">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddBoxIcon />}
                // onClick={handleOpen}
              >
                Add note
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "2em" }}>
          {/* <Typography>Your notes so far...</Typography> */}
          <NotesList />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
