import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Home from './components/Home';
import MenuExample from './components/Menu';
import registerServiceWorker from './registerServiceWorker';
import {Root} from './components/Root';
import {BrowserRouter as Router,Route, Switch } from 'react-router-dom';


class App extends React.Component{
    render() {
        return (
            <Router>
                <div>
                    <Root>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/menu" component={MenuExample} />
                            <Route path="/home" component={Home} />
                        </Switch>
                    </Root>
                </div>
            </Router>
        )
    }
}

render(<App />, window.document.getElementById('root'));
//registerServiceWorker();
