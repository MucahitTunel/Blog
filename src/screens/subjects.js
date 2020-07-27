import React from 'react';
import './../css/subjects.css';

import {Link} from "react-router-dom";
import Header from './header';

import {connect, dispatch} from 'react-redux';



class Subjects extends React.Component{

  constructor(props){
    super(props);

    this.browser = 1;

    this.state = {
      data:[],
      width: this.props.width,
    }

  }

  show=()=>{
    console.log("a");
    console.log(window.innerWidth);
  }

  componentDidMount() {
    this.s = setInterval(this.show.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.s);
  }

  update() {
    console.log("update");
  }





  componentDidMount(){
    this.fetching();
  }

  fetching = () => {
    var url = 'http://192.168.1.108:8080/subjects/';

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
          width: this.props.width,
          marginTop: 150,
        }

      }else {
        var style = {
         width: this.props.width,
       }
      }


      return (
        <div className="body" style={{width:this.props.width}}>

            <Header />

            <div className="Title" style={style}>
              <h1>KONULAR</h1>
            </div>

            <div style={{width:this.props.width}}>
                {this.state.data.map((v,k) => {
                  return(
                    <div className="subjectborder" key={k}>
                      <Link style={{textDecoration:'none', color:'#000'}} to={`/subjects/subjectDetail/${v.id}/${v.title}`}>
                      <div id="subjects" style={{padding:10, fontSize:20}}>
                        {v.title}
                      </div>
                      </Link>

                    </div>
                  );
                })}

            </div>
        </div>
      );

  }

}

const mapStateToProps = state => ({ width: state.width, mobileHeaderActive:state.mobileHeader })

const mapDispatchToProps = () => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subjects)
