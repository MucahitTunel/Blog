import React from 'react';
import './../css/color.css';


class Color extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      colors:["#ffffff","#ff0000","#ff7d7d","#ff7400","#ffdc00","#9fff00","#497400","#05ffd3","#007e68","#005bff","#002567","#c100ff","#51006a","#ff007d","#000000"],
    }
  }

  change = (e) => {
    var id = e.target.id;
    this.props.colorChange(id);
  }


  render(){
    return (
        <div className="Body">
          {this.state.colors.map((v,k) => {
            return(
              <div className="Color" key={k} id={v} style={{backgroundColor:v}} onClick={this.change}></div>
            );
          })}

        </div>
    );
  }
}

export default Color;
