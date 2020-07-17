import React from 'react';
import './../css/color.css';


class Textarea extends React.Component{

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
          <textarea id={this.state.id} onFocus={this.onFocus} style={{marginTop:20, width:'80%', color:this.state.color, fontSize:this.state.size}} value={this.state.text} onChange={this.change}></textarea>
        </div>
    );
  }
}

export default Textarea;
