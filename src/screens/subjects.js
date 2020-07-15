import React from 'react';
import './../css/subjects.css';

import {Link} from "react-router-dom";
import Header from './header';

class Subjects extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      data:[],
    }

  }

  componentDidMount(){
    this.fetching();
  }

  fetching = () => {
    var url = 'http://192.168.1.105:8080/subjects/';

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
    return (
        <div className="Body">
          <Header />

          <div className="Title">
            <h1>KONULAR</h1>
          </div>

          <div>
              {this.state.data.map((v,k) => {
                return(
                  <div className="subjectborder" key={k}>
                    <Link style={{textDecoration:'none', color:'#000'}} to={`/subjects/subjectDetail/${v.title}`}>
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

export default Subjects;
