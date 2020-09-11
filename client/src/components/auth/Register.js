import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

function Register(props) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = data;

    props.registerUser(newUser, props.history);
  };

  useEffect(() => {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, []);

//   //Skipping first iteration (exactly like componentWillReceiveProps):
//   const isFirstRun = useRef(true);
//   useEffect(() => {
//     if (isFirstRun.current) {
//       isFirstRun.current = false;
//       return;
//     }
//     if (props.errors) setErrors(props.errors);
//   }, [props.errors]);

  return (
    <div className="container" style={{ marginTop: "2em" }}>
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <Button>
              <ArrowBackIcon />
              Back to home
            </Button>
          </Link>
          <div
            className="col s12"
            style={{ paddingLeft: "11.250px", marginTop: "1.25em" }}
          >
            <Typography variant="h4">
              <b>Register</b> below
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Already have an account? <Link to="/login">Log in</Link>
            </Typography>
          </div>
          <form
            style={{ paddingLeft: "11.250px" }}
            noValidate
            onSubmit={onSubmit}
          >
            <TextField
              onChange={onChange}
              error={errors.name}
              fullWidth
              required
              id="name"
              label="Name"
              margin="normal"
            />
            <TextField
              onChange={onChange}
              error={errors.email}
              fullWidth
              required
              id="email"
              type="email"
              label="Email"
              margin="normal"
            />
            <TextField
              onChange={onChange}
              error={errors.password}
              fullWidth
              required
              id="password"
              type="password"
              label="Password"
              margin="normal"
              helperText="Must have 6 - 30 characters"
            />
            <TextField
              onChange={onChange}
              error={errors.password2}
              fullWidth
              required
              id="password2"
              type="password"
              label="Confirm Password"
              margin="normal"
            />

            <div style={{ marginTop: "2em" }}>
              <Button
                type="submit"
                size="large"
                color="primary"
                variant="contained"
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
