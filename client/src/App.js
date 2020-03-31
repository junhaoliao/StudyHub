import React from "react";

import "./App.css";
// Importing react-router-dom to use the React Router
import {BrowserRouter, Route, Switch} from "react-router-dom";
// Importing pages
import Home from "./react-components/Home";
import dash_board from "./react-components/dash_board";
import {RegularBB} from "./react-components/bill_board/regular_billboard";
import {Profile} from "./react-components/Profile";
import {CoursePage} from "./react-components/Courses";
import {Resources} from "./react-components/Resources";
import {AdminDashboard} from "./react-components/admin_dashboard";
//import 'semantic-ui-css/semantic.min.css'
// import Action functions
import {readCookie} from "./actions/RegularUser";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentUserID: {},
    };
    readCookie(this);
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            {/* Similar to a switch statement - shows the component depending on the URL path */}
            {/* Each Route below shows a different component depending on the exact path in the URL  */}
            {/*
            <Route path="/" exact component={Home} />
            <Route path="/dash_board" exact component={dash_board} />
            <Route path="/CSC309A" exact component={CSC309A} />
            <Route
              path="/CSC309A/resources"
              exact
              component={CSC309A_Resources}
            />
            <Route
              path="/CSC309A/noFile"
              exact
              component={CSC309A_Resources_someVideo}
            />
            <Route path="/bill_board" exact component={RegularBB} />
            <Route path="/abill_board" exact component={AdminBB} />
            <Route path="/login" exact component={LoginBox} />
            <Route path="/adash_board" exact component={AdminDashboard} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profileview" exact component={ProfileView} />
            <Route path="/ranking" exact component={Ranking} />
            <Route path="/a*" exact component={AdminPage} />
            <Route path="*" component={Page404} />
        */}
            <Route path="/dash_board" exact component={dash_board}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/" exact component={Home}/>
            <Route path="/bill_board" exact component={RegularBB}/>
            <Route path="/profile" exact component={Profile}/>
            {/*<Route path="/announcement" exact component={AddAnnouncement}/>*/}
            {/*<Route path="/course/:courseName">*/}
            {/*</Route>*/}

            <Route
                path="/courses/:courseName/resources"
                component={Resources}
            />
            <Route path="/courses/:courseName/" component={CoursePage}/>
            <Route path="/adash_board" exact component={AdminDashboard}/>

            {/*
            <Route
              exact
              path={
                [
                  "/",
                  "/home",
                  "/dash_board"
                ] 
              }
              render={({ history }) => (
                <div className="app">
            
                  {!currentUser ? (
                    <Home history={history} app={this} />
                  ) : (
                    <dash_board history={history}></dash_board>
                  )}
                  }
                </div>
              )}
            />
                */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
