import React from 'react';
import './../css/header.css';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {change} from "./../actions";


class Header extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      activeTab: 0,
      li:["Anasayfa","Hakkımda","İletişim"],
    }

  }



    click = (k) => {

      console.log("onClick");
      var p = this.state.li[k];
      var payload = "/" + p;
      this.props.change(payload);


    }

  render(){

    return (
        <div className="Header">


              <ul id="ul">

                {this.state.li.map((v,k) => {

                    return(
                      <a href={`/${v}`} key={k} onClick={()=>this.click(k)}><li id="li">{v}</li></a>
                    );

                })}

              </ul>

        </div>
    );
  }

}

const mapStateToProps = state => ({ path: state.path })

const mapDispatchToProps = () => {
  return {
    change,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Header)
