import React from 'react';

import './App.css';
// Importing react-router-dom to use the React Router
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// Importing pages
import Home from './react-components/Home';
import Page404 from './react-components/Page404';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */}
                    { /* Each Route below shows a different component depending on the exact path in the URL  */}
                    <Route path="/" exact component={Home}/>

                    <Route path="*" component={Page404}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
