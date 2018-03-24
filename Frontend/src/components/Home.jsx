import React, {Component} from 'react';
import '../App.css';
import MenuExampleSecondaryPointing from './MenuPointing';


export class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {

        return (
            <div>
                <div>
                    <MenuExampleSecondaryPointing/>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>

        );
    }

}


export default Home;
