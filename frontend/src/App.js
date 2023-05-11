import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import dotenv from "dotenv";

import PostDetails from "./components/PostDetails/PostDetails.jsx";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
// import Footer from "./components/Footer/Footer.js";
import Auth from "./components/Auth/Auth.js";
import Creator from "./components/Creator/Creator.jsx";
import NotFound from "./components/NotFound/NotFound.js";

dotenv.config();

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route
              path="/posts/:id"
              exact
              render={({ match }) =>
                match.params.id.match(/^[0-9a-fA-F]{24}$/) ? (
                  <PostDetails />
                ) : (
                  <Redirect to="/notFound" />
                )
              }
            />
            <Route path="/creators/:name" exact component={Creator} />
            <Route
              path="/auth"
              exact
              component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            />
            <Route path="/*" component={NotFound} />
          </Switch>
          {/* <Footer /> */}
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
