import React from 'react';
import './../css/subjects.css';
import Header from './header';

import {Link} from "react-router-dom";

import {connect} from 'react-redux';
import {change} from "./../actions";

class AboutUs extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      data:[],
      activeTab:1,
    }

    console.log(this.props.path);

  }




  render(){
    return (
        <div className="Body">
          <Header />
          Hakkımda
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

export default connect(mapStateToProps, mapDispatchToProps())(AboutUs)
