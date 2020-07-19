import React from 'react';


class Image extends React.Component{

  constructor(props){
    super(props);

    this.kontrol = 0;

    this.state = {
      id: this.props.id,
      dizino : this.props.dizino,
      selectedFile: null,
      fileurl: "",
    }
  }


  componentDidUpdate(){
      this.props.path(this.state.dizino);
  }

  imageChange = (e) =>{
    e.preventDefault();
    var fileurl = URL.createObjectURL(e.target.files[0])
    var file = e.target.files[0];

    this.setState({
      selectedFile: file,
      fileurl: fileurl,
    })
  }

  focus = (e) => {
    e.preventDefault();
  }


  render(){
    return (
        <div className="Body">
          <input onFocus={this.focus} name="image" style={{marginTop:20, width:'80%'}} type="file" name="image" accept="image/*" onChange={(e)=>this.imageChange(e)}/>
        </div>
    );
  }
}

export default Image;
