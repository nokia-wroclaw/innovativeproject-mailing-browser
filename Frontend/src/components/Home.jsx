import React, {Component} from 'react';
import '../App.css';
import MenuNavBar from './MenuNavBar';
import Footer from "./Footer";
import myImage from './nokia.png';

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
                <div style={{backgroundImage: `url(${myImage})` }}>
                    {this.props.children}
                </div>
               <Footer/>
            </div>
        );
    }
}

export default Home;
