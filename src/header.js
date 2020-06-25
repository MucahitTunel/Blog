import React from 'react';
import './App.css';
import './css/header.css';

class Header extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      activeTab: 0,
      li:["Anasayfa","Blog","Projelerim"],
    }

  }

  setActiveTab = (k) => {
    console.log("activetab");
    this.setState({
      activeTab: k,
    })
  }

  render(){
    console.log("aaa");
    return (
        <div className="Header">
          <ul id="ul">

            {this.state.li.map((v,k) => {
              if(this.state.activeTab === k){
                return(
                  <li id="li--active" key={k}> {v}</li>
                );
              }else {
                return(
                  <li id="li" key={k} onActiveTab={this.setActiveTab.bind(this,k)}> {v}</li>
                );
              }


            })}

          </ul>
        </div>
    );
  }

}

export default Header;
