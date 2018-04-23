import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Home from './components/Home';
import {BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import MailList from "./components/SingleThread";
import MenuMail from "./components/MenuMail";
import SingleThread from "./components/SingleThread";
import 'semantic-ui-css/semantic.min.css';


class App extends React.Component{
    render() {
        return (
            <Router>
                    <Home>
                        <Switch>
                            <Route exact path="/" component={MenuMail}/>
                            <Route exact path="/home/mail" component={MenuMail} />
                            <Route exact path="/singlethread/:id" component={SingleThread} />
                        </Switch>
                    </Home>
            </Router>
        )
    }
}

render(<App />, window.document.getElementById('root'));
//registerServiceWorker();
