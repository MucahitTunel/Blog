import React from 'react';
import '../../css/admin/deletePost.scss';
import AdminHeader from './adminHeader';
import {Link} from "react-router-dom";
import {connect, dispatch} from 'react-redux';

import {login} from "./../../actions";


class DeletePost extends React.Component{

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

    this.state = {
      data: [],
    }
  }

  componentDidMount(){
    this.fetch();
  }

  fetch = async () => {
    var url = 'http://192.168.1.108:8080/subjects/';

    fetch(url).then((response) => response.json())
    .then((response) => {
      console.log("*************************");
      console.log(response);
      this.setState({
        data:response,
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }


  remove = (e,k) => {
    e.preventDefault();
    var id = this.state.data[k].id;

    var data = {
      id: id,
    }

    var url = "http://192.168.1.108:8080/subjects/deletepost/";

    fetch(url, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data),

    }).then((response) => response.json())
    .then((response) => {
      if(response.err){
        alert("Hata oluştu")
      }else {
        this.fetch();
      }

    })
    .catch((error) => {
      console.error(error);
    });
  }


  render(){
    return (
        <div>
          <AdminHeader />

          <div className="subjectList">
            {this.state.data.map((v,k) => {
              return(

                <div className="removeBorder" key={k} style={{marginTop:10, display:'flex', padding:3}}>

                  <div style={{flex:7, position:'relative'}}>
                    <Link style={{color:'#000'}} to={`/postdetail/${v.id}/${v.title}`}>
                      {v.title}
                    </Link>
                  </div>

                  <div style={{flex:2, position:'relative', marginTop:3}}>
                    <i className="removeicon fa fa-trash" aria-hidden="true" style={{position:'absolute'}} onClick={(e) => this.remove(e,k)}>Sil</i>
                  </div>

                </div>

              );
            })}
          </div>

        </div>
    );
  }
}

const mapStateToProps = state => ({ width: state.width, mobileHeaderActive:state.mobileHeader, loginvalue:state.login })

const mapDispatchToProps = () => {
  return {
    login,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(DeletePost)
