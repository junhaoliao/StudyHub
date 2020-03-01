import React from "react";

import "./App.css";
// Importing react-router-dom to use the React Router
import {BrowserRouter, Route, Switch} from "react-router-dom";
// Importing pages
import Home from "./react-components/Home";
import dash_board from "./react-components/dash_board";
import CSC309A from "./react-components/CSC309A";
import CSC309A_Resources from "./react-components/CSC309A/resources";
import CSC309A_Resources_someVideo from "./react-components/CSC309A/someVideo";
import Page404 from "./react-components/Page404";
import {RegularBB} from "./react-components/bill_board/regular_billboard";
import {AdminBB} from "./react-components/bill_board/admin_billboard";
import {LoginBox} from "./react-components/LoginBox";
import {AdminDashboard} from "./react-components/admin_dashboard";
import {Profile} from "./react-components/Profile";
import {ProfileView} from "./react-components/ProfileView";

import Ranking from "./react-components/ranking";




//import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        {/* Similar to a switch statement - shows the component depending on the URL path */}
                        {/* Each Route below shows a different component depending on the exact path in the URL  */}
                        <Route path="/" exact component={Home}/>
                        <Route path="/dash_board" exact component={dash_board}/>
                        <Route path="/CSC309A" exact component={CSC309A}/>
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
                        <Route path="/bill_board" exact component={RegularBB}/>
                        <Route path="/abill_board" exact component={AdminBB}/>
                        <Route path="/login" exact component={LoginBox}/>
                        <Route path="/adash_board" exact component={AdminDashboard}/>
                        <Route path="/profile" exact component={Profile}/>
                        <Route path="/profileview" exact component={ProfileView}/>
                        <Route path="/ranking" exact component={Ranking}/>
                        <Route path="*" component={Page404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
