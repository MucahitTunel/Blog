import React from 'react';
import './../css/subjectDetail.css';
import Header from './header';
import {connect, dispatch} from 'react-redux';
import Myinfo from './myinfo'

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id : props.match.params.id,
      title: props.match.params.title,
      content: "",
      data: [],
    }

  }

  componentDidMount(){
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
        data:response.result,
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
        flex:7,
      }

    }else {
      var style = {
        flex:7,
     }
    }



    if(this.props.width > 768){
      return(
        <div className="Container">

          <Header />

          <div style={{display:'flex'}}>
            <div style={style}>
            {this.state.data.length > 0 ?

              <div className="body">
                <article className="article" style={{padding:10}}>

                  <div className="title">
                    <h2>{this.state.title.toUpperCase()}</h2>
                  </div>
                  <div style={{margin:5}}>
                    {this.state.data.map((v,k) => {
                      return(
                        <div key={k}>
                          <p>{v.content}</p>
                          <a href={v.link} target="_blank">{v.link}</a>
                        </div>
                      );
                    })}
                  </div>

                </article>
              </div>

              :

              null
            }
            </div>

            <div style={{flex:2, marginTop:70, marginRight:10}}>
              <div style={{width:'80%', padding:10}}>
                <Myinfo />
              </div>
            </div>
          </div>
        </div>
      )
    }else {
      return(
          <div>
              <Header />

              <div style={style}>
              {this.state.data.length > 0 ?

                <div className="body">
                  <article className="article" style={{padding:10}}>

                  <div className="title">
                    <h2>{this.state.title.toUpperCase()}</h2>
                  </div>
                  <div style={{margin:5}}>
                    {this.state.data.map((v,k) => {
                      return(
                        <div key={k}>
                          <p>{v.content}</p>
                          <a href={v.link} target="_blank">{v.link}</a>
                        </div>
                      );
                    })};
                  </div>
                  </article>
                </div>

                :

                null
              }
              </div>

              <div style={{marginLeft:'10%',width:150, marginTop:50}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail)
