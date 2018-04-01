import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Home from './components/Home';
import {BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import MailList from "./components/MailList";
import MenuMail from "./components/MenuMail";
import SingleMail from "./components/SingleMail";


class App extends React.Component{
    render() {
        return (
            <Router>
                    <Home>
                        <Switch>
                            <Route exact path="/" component={MailList}/>
                            <Route exact path="/mail" component={MenuMail} />
                            <Route exact path="/mail/:id" component={MenuMail} />
                            <Route exact path="/singlemail/:id" component={SingleMail} />
                        </Switch>
                    </Home>
            </Router>
        )
    }
}

render(<App />, window.document.getElementById('root'));
//registerServiceWorker();
