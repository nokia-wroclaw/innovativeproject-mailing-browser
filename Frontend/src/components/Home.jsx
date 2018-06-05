import React, {Component} from 'react';
import '../App.css';
import MenuNavBar from './MenuNavBar';
import Footer from "./Footer";

export class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div>
                <div>
                    <MenuNavBar/>
                </div>
                <div>
                    {this.props.children}
                </div>
               <Footer/>
            </div>
        );
    }
}

export default Home;
