import React from 'react';
import './../css/subjects.css';

import {Link} from "react-router-dom";
import Header from './header';
import Myinfo from './myinfo';

import {connect, dispatch} from 'react-redux';



class Projects extends React.Component{

  constructor(props){
    super(props);

    this.browser = 1;

    this.state = {
      data:[],
      width: this.props.width,
    }

  }

  componentDidMount(){
    this.fetching();
  }

  fetching = () => {
    var url = 'http://192.168.1.108:8080/projects/allprojects/';

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



  render(){
      if(this.props.mobileHeaderActive === true){
         var style = {
          marginTop: 200,
          width:'90%',
          flex:7,
        }

      }else {
        var style = {
          marginTop:70,
          width:'90%',
          flex:7,
       }
      }


      if(this.props.width > 768){
        return (
          <div className="body">

              <Header />
              <div style={{display:'flex'}}>
                <div style={style}>
                  <div className="Title">
                    <h1>PROJELERİM</h1>
                  </div>

                  <div style={{marginLeft:'10%'}}>
                    <ul>
                      {this.state.data.map((v,k) => {
                        return(
                          <div  key={k}>
                            <li>
                              <Link style={{color:'#000'}} to={`/projects/projectDetail/${v.id}/${v.title}`}>
                              <div id="subjects" style={{padding:10, fontSize:20}}>
                                {v.title}
                              </div>
                              </Link>
                            </li>
                          </div>
                        );
                      })}
                    </ul>
                  </div>

                </div>

                <div style={{flex:2, marginTop:70, marginRight:10}}>
                  <div style={{width:'80%', padding:10}}>
                    <Myinfo />
                  </div>
                </div>
              </div>
          </div>
        );
      }else {
        return(

            <div>
                <Header />

                <div style={style}>
                  <div className="Title">
                    <h1>PROJELERİM</h1>
                  </div>

                  <div style={{marginLeft:'10%'}}>
                  <ul>
                    {this.state.data.map((v,k) => {
                      return(
                        <div  key={k}>
                          <li>
                            <Link style={{color:'#000'}} to={`/projects/projectDetail/${v.id}/${v.title}`}>
                            <div id="subjects" style={{padding:10, fontSize:20}}>
                              {v.title}
                            </div>
                            </Link>
                          </li>
                        </div>
                      );
                    })}
                  </ul>

                  </div>
                </div>

                <div style={{marginLeft:'10%', marginTop:50}}>
                  <Myinfo />
                </div>
            </div>
        );
      }

  }

}

const mapStateToProps = state => ({ width: state.width, mobileHeaderActive:state.mobileHeader })

const mapDispatchToProps = () => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
