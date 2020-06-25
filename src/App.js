import React from 'react';
import './App.css';
import Header from './header';
import Subjects from './subjects';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      data : [],
      username: "",
      
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.hand = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.fetching();
  }

  fetching = () => {
    var url = 'http://192.168.1.104:8080/subjects/';

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

  handleSubmit = (event) => {
    event.preventDefault();


  }

  handleChange = (event) => {

  }



  render(){

    return (
      <div className="App">
        <Header />
        <Subjects />

        <form onSubmit={this.handleSubmit}>
          <label>Kullanıcı Adı: </label>
          <input name="username" id="input" type="text"/>

          <input type="submit" value="Submit" />
          <input type="reset" value="Reset" />

        </form>



        {this.state.data.length === 0  ?

          null
          :
          <div>

              {this.state.data.map((v,k) => {
                return(
                  <div key={k}>
                    <h1>{v.title}</h1>
                    <h1>{v.content}</h1>
                  </div>
                );
              })}

          </div>
        }

      </div>
    );
  }

}

export default App;
