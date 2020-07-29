import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {width, mobileHeaderActive} from "./../actions";
import { Col } from 'react-bootstrap';


class Myinfo extends React.Component{
  constructor(props){
    super(props);

  }




  render(){

      return (
        <div style={{backgroundColor:'#e47afc',padding:10, borderRadius:10, marginRight:10}}>
          <h4 style={{marginTop:20}}>Mücahit Tünel</h4><br/><br/>

          <div>
            <label>Kullanılanlar:</label>
            <ul>
              <li>Reactjs</li>
              <li>Nodejs</li>
              <li>Mysql</li>
              <li>Redux</li>
              <li>Sass</li>
            </ul>
          </div>

          <a href="https://github.com/MucahitTunel" target="_blank" style={{color:'#000'}}>Github</a><br/>

          <a href="https://www.linkedin.com/in/m%C3%BCcahit-t%C3%BCnel-7087a6151/" target="_blank" style={{color:'#000'}}>Linkedin</a>
        </div>
      );
  }
}

const mapStateToProps = state => ({ width: state.width, mobileHeaderActive })

const mapDispatchToProps = () => {
  return {
    width,
    mobileHeaderActive,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Myinfo)
