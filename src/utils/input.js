import React from 'react';
import './../css/color.css';


class Input extends React.Component{

  constructor(props){
    super(props);


    this.state = {
      text:'',
      color: this.props.color,
      size: this.props.size,
      id: this.props.id,
      dizino : this.props.dizino,
    }
  }

  change = (e) => {
    this.setState({
      text:e.target.value,
    })
  }

  onFocus=(e)=>{
    this.props.focus(e.target.id)
  }



  render(){
    return (
        <div className="Body">
          <input id={this.state.id} onFocus={this.onFocus}  style={{marginTop:20, width:'80%', color:"#000000", fontSize:22, fontWeight:'bold'}} value={this.state.text} onChange={this.change} />
        </div>
    );
  }
}

export default Input;
