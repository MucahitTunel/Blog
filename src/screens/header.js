import React from 'react';
import './../css/sass/header.scss';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {width, mobileHeaderActive} from "./../actions";
import { Col } from 'react-bootstrap';


class Header extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      activeTab: 0,
      li:["Anasayfa","Hakkımda","Projelerim"],
      width: window.innerWidth,
      height: window.innerHeight,
      active: false,
    }

  }

  updateDimensions = () => {
  this.props.width(window.innerWidth);
  this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }



    click = (k) => {

      console.log("onClick");
      var p = this.state.li[k];
      var payload = "/" + p;
      this.props.change(payload);


    }


  hamburger = (e) => {

    this.props.mobileHeaderActive(!this.state.active);

    this.setState({
      active: !this.state.active,
    })
  }

  render(){
    if(this.state.width > 768){
      return (
          <div className="Header" style={{width:this.state.width}}>
                <ul id="ul">

                  {this.state.li.map((v,k) => {
                      return(
                        <a href={`/${v}`} key={k} onClick={()=>this.click(k)}><li id="li">{v}</li></a>
                      );
                  })}

                </ul>

          </div>
      );
    }else {
      return(
          <div className="mobileHeader" >
                  <div style={{position:'relative', width:'100%', backgroundColor:'#7574b2'}}>
                    <i className="fa fa-bars fa-2x" style={{padding:10, position:'absolute', alignItems:'flex-end', justifyContent:'flex-end'}} onClick={this.hamburger}></i>

                  </div>
                  <div className={this.state.active===false ? "myLinks" : "change-bar" }>

                    {this.state.li.map((v,k) => {
                        return(
                          <a id="dropdown" href={`/${v}`} key={k} onClick={()=>this.click(k)}>{v}</a>
                        );
                    })}

                  </div>
          </div>
      )
    }
  }
}

const mapStateToProps = state => ({ width: state.width, mobileHeaderActive })

const mapDispatchToProps = () => {
  return {
    width,
    mobileHeaderActive,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Header)
