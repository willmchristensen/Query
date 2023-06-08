import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage";
import { authenticate } from "./store/session";
import MainContent from "./components/MainContent";
import SingleQuestion from "./components/SingleQuestion";
import NavBar from "./components/NavBar";
import ProfilePage from "./components/ProfilePage";
import SpacesPage from "./components/SpacesPage";
import SingleSpace from "./components/SingleSpace";
import Following from "./components/Following";
import NotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/questions/:questionId">
            <NavBar isLoaded={isLoaded} />
            <SingleQuestion />
          </Route>
          <Route path="/users/:userId">
            <NavBar isLoaded={isLoaded} />
            <ProfilePage />
          </Route>
          <Route path="/spaces/:spaceId">
            <NavBar isLoaded={isLoaded} />
            <SingleSpace />
          </Route>
          <Route path="/spaces">
            <NavBar isLoaded={isLoaded} />
            <SpacesPage />
          </Route>
          <Route path={["/following", "/answer", "/notifications"]}>
            <NavBar isLoaded={isLoaded} />
            <Following />
          </Route>
          <Route path="/home">
            <NavBar isLoaded={isLoaded} />
            <MainContent />
          </Route>
          <Route exact path={["/", "/login"]}>
            <SplashPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
