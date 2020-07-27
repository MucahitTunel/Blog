import React from 'react';
import '../../css/admin/adminLogin.css';


class AdminLogin extends React.Component{

  constructor(props){
    super(props);



    this.state = {
      email: "",
      password: "",
    }

    this.kontrol = 0;
    this.login = this.login.bind(this);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handlechangePassword = this.handleChangePassword.bind(this);
  }


  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    })
  }

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  formKontrol = () => {
    var mailkontrol = true;
    var passkontrol = true;
    var mail = this.state.email.split("@");

    if(this.state.email !== "" && this.state.password !== ""){

        /*
          Mail formKontrol
        */
        if(mail.length < 2){
          if(mail[1] === "hotmail.com" || "gmail.com"){

          }else {
            mailkontrol = false;
          }
        }else {
          mailkontrol = false;
        }

        /*
          Password KOntrol
        */

        if(this.state.password < 8){
          passkontrol = false;
        }
    }

    if(mailkontrol===true && passkontrol===true){
      return true;
    }else {
      return false;
    }
  }


  login = (e) => {
    console.log("login");
    e.preventDefault();
    var sonuc = this.formKontrol();
    if(sonuc === true){
      alert("Mail veya Şifre Hatalı")
    }else {

      var formData = new FormData();
      formData.append("mail", JSON.stringify(this.state.email));
      formData.append("psw", JSON.stringify(this.state.password));

      var url = "http://192.168.1.108:8080/post/login/";

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
            if(response.result.length > 0){
                console.log("Başarılı");
                this.props.history.push("/")
            }else {
              console.log("Kullanıcı adı veya şifre hatalı");
            }

          }
      }).catch(error =>  alert(error));

    }
  }


  render(){

    return (
      <div style={{width:'100%', height:'100%', backgroundColor:'#1499b1', position:'fixed'}}>
        <div class="login-border col-4">
          <form style={{paddingTop:20, paddingBottom:20}}>
            <div class="form-group">
              <label>Email address</label>
              <input type="email" class="col-10 col-sm-10 form-control" id="email" value={this.state.email} onChange={this.handleChangeEmail}/>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="col-10 col-sm-10 form-control" id="pwd" value={this.state.password} onChange={this.handleChangePassword} />
            </div>
            <button type="submit" class="btn btn-primary col-10 col-sm-10" onClick={this.login}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
