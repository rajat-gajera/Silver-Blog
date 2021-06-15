import React, { createContext, useReducer } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Writeblog from "./components/Writeblog";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Errorpage from "./components/Errorpage";
import Logout from "./components/Logout";
import Readblog from "./components/Readblog";
import { Route, Switch, Redirect } from "react-router-dom";
import { initialState, reducer } from "./reducer/UseReducer";
import "./App.css";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect from="/" to="/home"></Redirect>
      </Route>
      <Route exact path="https://rajat-gajera.github.io/Silver-Blog/home">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/writeblog">
        <Writeblog />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Route exact path="/home/:id">
        <Readblog />
      </Route>
      <Route>
        <Errorpage />
      </Route>
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </div>
  );
}

export default App;
