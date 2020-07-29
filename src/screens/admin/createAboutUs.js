import React from 'react';
import AdminHeader from './adminHeader';
import '../../css/sass/aboutus.scss';

import {connect, dispatch} from 'react-redux';

class AboutUs extends React.Component {

  constructor(props){
    super(props);

    this.diffcontrol="";

    this.state = {
      about: "",
      update: false,
    }

    this.handleChangeAbout = this.handleChangeAbout.bind(this);
    this.kaydet = this.kaydet.bind(this);
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


  handleChangeAbout = (e) => {
    this.setState({
      about: e.target.value,
    })
  }


  kaydet = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("about", JSON.stringify(this.state.about));

    var url = "http://192.168.1.108:8080/detail/updateaboutus/";

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
          this.diffcontrol = this.state.about;
          this.setState({update:true})
        }
    }).catch(error =>  alert(error));
  }


  invisible = () => {
      this.setState({
        update:false,
      })
  }


  render(){

    if(this.state.update===true){
      setTimeout(this.invisible,5000)//Timeout
    }

    return(
      <div style={{width:this.props.width}}>

        <AdminHeader />

          <div className="Title">
            <h1>Hakkımda</h1>
          </div>

          <div className="about">
            <textarea style={{width:'80%'}} value={this.state.about} onChange={this.handleChangeAbout}/>
          </div>

          {this.state.about !== this.diffcontrol ?

            <div>
              <button type="button" className="btn btn-primary" style={{width:100, marginLeft:'10%', textAlign:'center'}} onClick={this.kaydet}>KAYDET</button>
            </div>

            :

            <div>
              <button type="button" className="btn btn-primary" style={{width:100, marginLeft:'10%', textAlign:'center'}} onClick={this.kaydet} disabled>KAYDET</button>
            </div>

          }


          {this.state.update === true ?

            <div className="info">
              Güncelleme Başarılı
            </div>

            :

            null
          }


      </div>
    );
  }

}


const mapStateToProps = state => ({ width: state.width })

const mapDispatchToProps = () => {
  return {

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AboutUs)
