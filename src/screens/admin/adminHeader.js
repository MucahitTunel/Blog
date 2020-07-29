import React from 'react';
import '../../css/admin/adminHeader.scss';

import {width, mobileHeaderActive} from "../../actions";
import {connect} from 'react-redux';


class AdminHeader extends React.Component{

  constructor(props){
    super(props);

    this.kontrol = 0;

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
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


  render(){
    return (
        <div>
          <div className="Headeradmin">
            <ul className="header_ul">
              <li className="header_li"><a href="/">Gönderiler</a>
                <ul className="header_under_ul">
                  <li className="header_under_li"><a href="/adminCreateBlog">Post Oluştur</a></li>
                  <li className="header_under_li"><a href="/">Post Düzenle</a></li>
                  <li className="header_under_li"><a href="/">Post Sil</a></li>
                </ul>
              </li>
              <li className="header_li"><a href="#">Ayarlar</a>
                <ul className="header_under_ul">
                  <li className="header_under_li"><a href="/adminCreateAboutUs">Hakkımda</a></li>
                  <li className="header_under_li"><a href="/">Ana Sayfa</a></li>
                  <li className="header_under_li"><a href="/">İletişim</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({ width: state.width })

const mapDispatchToProps = () => {
  return {
    width,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(AdminHeader)
