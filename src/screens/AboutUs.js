import React from 'react';
import './../css/sass/aboutus.scss';
import Header from './header';

import {Link} from "react-router-dom";

import {connect} from 'react-redux';
import {change} from "./../actions";

import Myinfo from './myinfo';

class AboutUs extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      about: "",
    }

    console.log(this.props.path);

  }

  componentDidMount(){
    this.fetching();
  }

  fetching = () => {
    var url = 'http://192.168.1.108:8080/detail/aboutus';

    fetch(url).then((response) => response.json())
    .then((response) => {
      if(response.hata){
        alert("Yüklenirken hata meydana geldi");
      }else {
        console.log(response[0].about);
        this.diffcontrol = response[0].about;
        this.setState({
          about: response[0].about,
        })
      }

    })
    .catch((error) => {
      console.error(error);
    });
  }



  render(){

    if(this.props.mobileHeaderActive === true){
       var style = {
        marginTop: 150,
        flex:7,
      }

    }else {
      var style = {
        marginTop:70,
        flex:7
     }
    }

    return (
        <div className="Body" style={{width: this.props.width}}>
          <Header />

          <div style={{display:'flex'}}>
            <div style={style}>

            <div className="Title">
              <h1>Hakkımda</h1>
            </div>

            <div style={{marginLeft:'10%', width:'80%'}}>
              <p>{this.state.about}</p>
            </div>

            </div>

            <div style={{flex:2, marginTop:70, marginRight:10}}>
              <div style={{width:'80%', padding:10}}>
                <Myinfo />
              </div>
            </div>
          </div>




        </div>
    );
  }
}


const mapStateToProps = state => ({ path: state.path, width: state.width,mobileHeaderActive:state.mobileHeader })

const mapDispatchToProps = () => {
  return {
    change,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(AboutUs)
