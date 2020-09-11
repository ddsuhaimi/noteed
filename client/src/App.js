import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from './components/private-route/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'
import Container from "@material-ui/core/Container";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwt_decode from 'jwt-decode'
import NoteForm from "./components/dashboard/NoteForm";
import NoteView from "./components/dashboard/NoteView";

// check for token to keep user logged in
if (localStorage.jwtToken) {
  // set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  // decode to get user data
  const decoded = jwt_decode(token)
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
      // logout user
      store.dispatch(logoutUser())

      // redirect to login
      window.location.href = './login'
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Container maxWidth="sm">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/notes/new" component={NoteForm} />
              <PrivateRoute exact path="/notes/:noteId/edit" component={(props) => <NoteForm edit={true} {...props}/>} />
              <PrivateRoute exact path="/notes/:noteId" component={(props) => <NoteView view={true} {...props}/>} />
            </Switch>
          </Container>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
