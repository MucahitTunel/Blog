import React from 'react';
import '../../css/admin/adminHome.css';
import AdminHeader from './adminHeader';
import {connect, dispatch} from 'react-redux';
import {login} from "./../../actions";


class AdminHome extends React.Component{

  constructor(props){
    super(props);

    var deger = localStorage.getItem("isLogin");

    if(deger==="true" && this.props.loginvalue===false){
      console.log("if şartı");
      this.props.login();
    }

    if(deger!=="true"){
      console.log("login şartı");
      this.props.history.push("/adminLogin");
    }
  }


  render(){
    return (
        <div>
          <AdminHeader />
        </div>
    );
  }
}

const mapStateToProps = state => ({ loginvalue: state.login})

const mapDispatchToProps = () => {
  return {
    login,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(AdminHome)
