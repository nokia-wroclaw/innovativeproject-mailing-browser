import React, {Component} from 'react';
import '../App.css';
import MenuNavBar from './MenuNavBar';
import Footer from "./Footer";
import myImage from './mail3.jpg';

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
                <div style={{ width:"100vw", height:"100vh", backgroundRepeat:"repeat-y", backgroundImage: `url(${myImage})` }}>
                    {this.props.children}
                </div>
               <Footer/>
            </div>
        );
    }
}

export default Home;
