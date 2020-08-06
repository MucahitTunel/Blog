import React from 'react';
import '../../css/admin/adminHeader.scss';

import {width, mobileHeaderActive, login} from "../../actions";
import {connect} from 'react-redux';
import { Route } from 'react-router-dom'


class AdminHeader extends React.Component{

  constructor(props){
    super(props);

    this.kontrol = 0;

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.changepage = this.changepage.bind(this);

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

  changepage = (e) => {
    e.preventDefault();
  }





  render(){
    return (
        <div style={{position:'fixed', zIndex:100}}>
          <div className="Headeradmin">
            <div style={{flex:5}}>
              <ul className="header_ul">
                <li className="header_li">Gönderiler
                  <ul className="header_under_ul">

                    <Route render={({ history}) => (
                      <div>
                      <li className="header_under_li" onClick={()=>history.push("/adminCreateBlog")}>Post Oluştur</li>
                      <li className="header_under_li">Post Düzenle</li>
                      <li className="header_under_li" onClick={()=>history.push("/deletePost")}>Post Sil</li>
                      </div>
                    )} />

                  </ul>
                </li>
                <li className="header_li">Ayarlar
                  <ul className="header_under_ul">

                  <Route render={({ history}) => (
                    <div>
                      <li className="header_under_li">Hakkımda</li>
                      <li className="header_under_li">Ana Sayfa</li>
                      <li className="header_under_li">Projelerim</li>
                    </div>
                  )} />

                  </ul>
                </li>
                <li className="header_li">Projelerim
                  <ul className="header_under_ul">

                  <Route render={({ history}) => (
                    <div>
                      <li className="header_under_li" onClick={() => history.push("/adminCreateProject")}>Proje Oluştur</li>
                      <li className="header_under_li"  onClick={() => history.push("/deleteProject")}>Projelerim</li>

                    </div>
                  )} />

                  </ul>
                </li>
              </ul>
            </div>

            <div className="logout" style={{flex:1}}>

                <a href="/adminLogin" onClick={()=>localStorage.clear()}><i className="fa fa-sign-out fa-2x" style={{padding:10}} aria-hidden="true"></i></a>


            </div>



          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({ width: state.width, login: state.login })

const mapDispatchToProps = () => {
  return {
    width,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(AdminHeader)
