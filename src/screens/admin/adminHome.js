import React from 'react';
import '../../css/admin/adminHome.css';
import AdminHeader from './adminHeader';


class AdminHome extends React.Component{

  constructor(props){
    super(props);

    this.kontrol = 0;

  }


  render(){
    return (
        <div>
          <AdminHeader />
        </div>
    );
  }
}

export default AdminHome;
