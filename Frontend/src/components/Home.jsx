import React, { Component } from 'react';
import '../App.css';
import MenuExample from './Menu';
import MenuExampleSecondaryPointing from './MenuPointing';
import _ from 'lodash';
import { request } from 'http';
import axios from 'axios';


export class Home extends Component {

constructor(){
  super();
    this.state = {
        mails: {}
    };
}
// clicked(){
//   console.log('the butt was clicked');
// }

componentWillMount(){
this.search();
}

componentDidMount(){

  }

updateSearch(){
  this.search(this.refs.query.value)
}

clicked(){
  console.log("ul click");
}
  render() {
    // var mails = _.map(this.state.mails, (mail, k) =>{
    //   return <li key = {k}> {mail.name} </li>;
    // });
    

    //var users = this.state.users.firstName
    //console.log(mails);
    return(
      <div>
      <input ref="query" onChange={(e)=>{this.updateSearch();}}type="text"/>

      {/*<ul onClick ={this.clicked}>{mails}</ul>*/}
        <div>
        <MenuExampleSecondaryPointing/>
        </div>
        <div>
            {this.props.children}
        <button onClick ={this.clicked}>TheButton</button>
        </div>
    </div>
      );
    }

search(query = "star"){
  // var url="http://localhost:3000/users/2";
  // Request.get(url).then((response)=>{
  //   console.log(response);

  // });
  axios.get("db.json")
  .then( (response) => {
    console.log(response);
    this.setState({
      mails: response.data.mail,
      total: response.data.mail.length
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

}



export default Home;
