import React from "react";
import Favorites from "../Favorites/favorites";
import { HashRouter as Router, Link, Route, NavLink} from "react-router-dom";
import Search from "../Search/Search";

function App() {
  return (
    <Router>
      <NavLink className="NavFavorite" to="/favorites"> Favorites </NavLink>
      <NavLink className="NavSearch" to="/search"> Search </NavLink>
      <Route path="/search" exact>
        <Search />
      </Route>

      <Route path="/favorites">
        <Favorites />
      </Route>
    </Router>
  );
}

export default App;
