import React from 'react';
import Home from './Home';


export class Root extends React.Component{
    render(){
        return (
            <div>
                <div>

                </div>
                <div >
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
    }
