import React from "react";

import "./App.css";
// Importing react-router-dom to use the React Router
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Importing pages
import Home from "./react-components/Home";
import dash_board from "./react-components/dash_board";
import { RegularBB } from "./react-components/bill_board/regular_billboard";
import { AdminBB } from "./react-components/bill_board/admin_billboard";
import { Favourites } from "./react-components/Favourites";
import { Profile } from "./react-components/Profile";
import { CoursePage } from "./react-components/Courses";
import { Resources } from "./react-components/Resources";
import { AdminDashboard } from "./react-components/admin_dashboard";
import { Page404 } from "./react-components/Page404";
import { Rankings } from "./react-components/Rankings";

//import 'semantic-ui-css/semantic.min.css'
// import Action functions

class App extends React.Component {


    render() {
        // const { currentUser } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            {/* Similar to a switch statement - shows the component depending on the URL path */}
            {/* Each Route below shows a different component depending on the exact path in the URL  */}
            <Route path="/" exact component={Home} />
            <Route path="/dash_board" exact component={dash_board} />
            <Route path="/bill_board" exact component={RegularBB} />
            <Route path="/favourites" exact component={Favourites} />
            <Route path="/profile" exact component={Profile} />
            <Route
              path="/courses/:courseName/resources"
              component={Resources}
            />
            <Route path="/abill_board" exact component={AdminBB} />
            <Route path="/courses/:courseName/" component={CoursePage} />
            <Route path="/adash_board" exact component={AdminDashboard} />
            <Route path="/rankings" component={Rankings} />
            <Route path="*" component={Page404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
