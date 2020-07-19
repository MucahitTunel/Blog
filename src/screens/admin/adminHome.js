import React from 'react';
import '../../css/admin/adminHome.css';


class AdminHome extends React.Component{

  constructor(props){
    super(props);

    this.kontrol = 0;

  }


  render(){
    return (
        <div>
          <div className="Header">
            <ul className="header_ul">
              <li className="header_li"><a href="#">Gönderiler</a>
                <ul className="header_under_ul">
                  <li className="header_under_li"><a href="/adminCreateBlog">Post Oluştur</a></li>
                  <li className="header_under_li"><a href="#">Post Düzenle</a></li>
                  <li className="header_under_li"><a href="#">Post Sil</a></li>
                </ul>
              </li>
              <li className="header_li"><a href="#">Ayarlar</a>
                <ul className="header_under_ul">
                  <li className="header_under_li"><a href="#">Hakkımda</a></li>
                  <li className="header_under_li"><a href="#">Ana Sayfa</a></li>
                  <li className="header_under_li"><a href="#">İletişim</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
    );
  }
}

export default AdminHome;
