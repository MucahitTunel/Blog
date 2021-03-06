import React from 'react';
import '../../css/admin/adminCreateProjects.scss';
import AdminHeader from './adminHeader';

import {connect, dispatch} from 'react-redux';

import {login} from "./../../actions";
import FlashMessage from 'react-flash-message';


class EditProject extends React.Component{

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
      title: "",
      content: "",
      link: "",
      showMessage: false,
      id: props.match.params.id,
      title: props.match.params.title,
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
  }


  componentDidMount(){
    this.getproject();
  }

  getproject = () => {
    var url = 'http://192.168.1.108:8080/projects/projectdetail/';
    var data = {
      title: this.state.title,
      id: this.state.id,
    }
    fetch(url, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data),

    }).then((response) => response.json())
    .then((response) => {
      console.log("*************************");
      console.log(response);
      this.setState({
        title:response.result[0].title,
        content:response.result[0].content,
        link:response.result[0].link,
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }





  handleChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  handleChangeContent = (e) => {
    this.setState({
      content: e.target.value,
    })
  }

  handleChangeLink = (e) => {
    this.setState({
      link: e.target.value,
    })
  }


  save = (e) => {
    e.preventDefault();

    var url = "http://192.168.1.108:8080/projects/update/";

    var formData = new FormData();
    formData.append("title", JSON.stringify(this.state.title));
    formData.append("content", JSON.stringify(this.state.content));
    formData.append("link", JSON.stringify(this.state.link));
    formData.append("id", JSON.stringify(this.state.id));


    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type' : 'multipart/form-data',
      },
      body: formData,

    }).then(response => response.json() )
      .then((response) => {


        if(response.error){
          console.log("HATA");
        }else {
          /*this.setState({
            title:response.result[0].title,
            content:response.result[0].content,
            link:response.result[0].link,
          })*/

        }
    }).catch(error =>  alert(error));
  }



  render(){
    return (
        <div style={{position:'relative'}}>
          <AdminHeader />

          <div className="adminProjectBorder">

            <form className="form-horizontal">
              <div className="form-group">
                <label className="control-label col-sm-2">Başlık</label>
                <div className="col-sm-10">
                  <input className="form-control" type="text" onChange={this.handleChangeTitle} value={this.state.title} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2">İçerik</label>
                <div className="col-sm-10">

                  <textarea className="form-control" onChange={this.handleChangeContent} value={this.state.content}></textarea>

                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-sm-2">Link</label>
                <div className="col-sm-10">
                  <input className="form-control" type="text" onChange={this.handleChangeLink} value={this.state.link} />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button className="btn btn-primary btn-block" onClick={this.save}>Kaydet</button>
                </div>
              </div>
            </form>

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

export default connect(mapStateToProps, mapDispatchToProps())(EditProject)
