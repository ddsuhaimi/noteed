import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";

import { Link } from "react-router-dom";
function Login(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = data;

    props.loginUser(userData);
  };

  useEffect(() => {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }

    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.auth, props.errors]);

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
              <b>Login</b> below
            </Typography>
          </div>

          <form
            style={{ paddingLeft: "11.250px" }}
            noValidate
            onSubmit={onSubmit}
          >
          {errors && <p>{errors.email}
          {errors.emailNotFound}{errors.password} {errors.passwordIncorrect}</p>}
            <TextField
              onChange={onChange}
              error={errors.email || errors.emailNotFound}
              fullWidth
              required
              id="email"
              type="email"
              label="Email"
              margin="normal"
            />
            <TextField
              onChange={onChange}
              error={errors.password || errors.passwordIncorrect}
              fullWidth
              required
              id="password"
              type="password"
              label="Password"
              margin="normal"
            />

            <div style={{ marginTop: "2em" }}>
              <Button
                type="submit"
                size="large"
                color="primary"
                variant="contained"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
