import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import PropTypes from 'prop-types'
import { connect } from "react-redux";

function Landing(props) {
  return (
    <div
      style={{ height: "75vh", marginTop: "1em" }}
      className="container valign-wrapper"
    >
      <div className="row">
        <div className="col s12 center-align">
          <Typography variant="h2" display="inline" color="primary">
            Note-taking.
          </Typography>
          <Typography
            varaint="subtitle1"
            display="inline"
            color="textsecondary"
          >
            but much better
          </Typography>
          <Paper elevation="1" style={{ padding: "10px", marginTop: '1.5em' }}>
            <Typography variant="caption" display="block">
              All in one workspace.
              <br />
              One tool for your whole team. Write, plan, and get organized.
            </Typography>
          </Paper>
          <br />
          {!props.auth.isAuthenticated ? <Grid container spacing={3}>
            <Grid item xs={6}>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="primary" size="large">
                  Register
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                to="/login"
                style={{ textDecoration: "none", float: "right" }}
              >
                <Button variant="contained" color="primary" size="large">
                  <Typography>Login</Typography>
                </Button>
              </Link>
            </Grid>
          </Grid> : <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography display="inline" variant="subtitle2" color="textSecondary">You are logged in.</Typography>
              <Button href="/dashboard" size="large" style={{float: 'right'}} display="inline" color="primary" variant="contained">Go to Dashboard <ArrowForwardIcon /></Button>
              </div>}
        </div>
      </div>
    </div>
  );
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Landing);
