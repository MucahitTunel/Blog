import React from 'react';
import './../css/subjectDetail.css';

class SubjectDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title : props.match.params.id,
      content: "",
      data: [],
    }

  }

  componentDidMount(){
    var url = 'http://192.168.1.108:8080/subjects/subjectDetail/';
    fetch(url, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title:this.state.title}),

    }).then((response) => response.json())
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
    return(
      <div>
        {this.state.data.map((v,k) => {
          return(

              <div className="container" key={k}>
                <div className="title">
                  <h2>{v.title.toUpperCase()}</h2>
                </div>

                <div className="content">
                  <p>{v.content}</p>
                </div>



              </div>

          );
        })}
      </div>
    )
  }
}


export default SubjectDetail;
