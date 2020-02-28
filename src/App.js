import React from "react";

import './App.css';
// Importing react-router-dom to use the React Router
import {BrowserRouter, Route, Switch} from "react-router-dom";
// Importing pages
import Home from './react-components/Home';
import dash_board from './react-components/dash_board';
import CSC309A from './react-components/CSC309A';
import CSC309A_Resources from './react-components/CSC309A/resources';
import Page404 from './react-components/Page404';
import hub_Billboard from "./react-components/bill_board/bill_board";

//import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */}
                        { /* Each Route below shows a different component depending on the exact path in the URL  */}
                        <Route path="/" exact component={Home}/>
                        <Route path="/dash_board" exact component={dash_board}/>
                        <Route path="/CSC309A" exact component={CSC309A}/>
                        <Route path="/CSC309A/resources" exact component={CSC309A_Resources}/>
                        <Route path="/bill_board" exact component={hub_Billboard}/>

                        <Route path="*" component={Page404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
