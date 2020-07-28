import React from 'react';
import './../css/subjectDetail.css';
import Header from './header';
import {connect, dispatch} from 'react-redux';

class SubjectDetail extends React.Component {
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
    var url = 'http://192.168.1.108:8080/subjects/subjectDetail/';
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
    console.log(this.state.data.length);
    if(this.props.mobileHeaderActive === true){
       var style = {
        marginTop: 150,
      }

    }else {
      var style = {
     }
    }

    return(
      <div className="Container">

        <Header />



        {this.state.data.length > 0 ?

          <div className="body" style={style}>
            <article className="article" style={{padding:10}}>

            <div className="title">
              <h2>{this.state.title.toUpperCase()}</h2>
            </div>
            <div style={{margin:5}}>
            {this.state.data.map((v,k) => {
              if(v.el_type === "yazi"){
                var props = v.props.split(".");
                var color = props[0];
                var size = parseInt(props[1]);

                return(
                  <div key={k}>
                    <p style={{fontSize:size, color:color}}> {v.data} </p>
                  </div>
                );
              }else if (v.el_type === "alt baslik") {
                return(
                  <div key={k}>
                    <h2> {v.data} </h2>
                  </div>
                );
              }else {
                var url = "http://192.168.1.108:8080/images/" + v.data;
                return(
                  <div key={k}>
                    <img src={url} width="300" height="300" />
                  </div>
                );
              }
            })}
            </div>
            </article>
          </div>

          :

          null
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({ width: state.width, mobileHeaderActive:state.mobileHeader })

const mapDispatchToProps = () => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDetail)
