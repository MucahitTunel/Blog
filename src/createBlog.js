import React from 'react';
import './App.css';


class CreateBlog extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      data : [],
      username: "",
      title:'',
      options: null,
      blog: null,
      livalue:["yazı", "resim"],
      fileupl: '',
      yazi:[],
      resim:[],
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.click = this.click.bind(this);
    this.imageChange = this.imageChange.bind(this);

  }

  componentDidMount(){

  }

  handleTitleChange = (e) =>{
    this.setState({
      title: e.target.value,
    })
  }

  imageChange = (e, uzunluk) =>{
    var img = new Image();
    //console.log(uzunluk);

    img.onload = function() {
            alert(this.width + " " + this.height);
    };
    img.onerror = function() {
        alert( "not a valid file: " + file.type);
    };

    var file = URL.createObjectURL(e.target.files[0])

    console.log(file);



    var image = <div style={{marginTop:20}}><img id="uploadimage" src={file} alt="Girl in a jacket"  /></div>
    var dizi = this.state.data;
    dizi[dizi.length] = image;
    this.setState({
      data: dizi,
    })

  }

  click = (e,v) => {
    console.log(v);
    console.log(e.view);
    if(v === "yazı"){
      var yazi = <textarea id="multitext" style={{marginTop:20, width:'80%'}} type="text"></textarea>

      var uzunluk = this.state.yazi.length;

      var veriler = {
        id: uzunluk,
        data : yazi,
        type: "yazı",
      }


      var dizi = this.state.data;
      dizi[dizi.length] = veriler;
      this.setState({
        data: dizi,
        yazi:veriler,
      })
    }else {

      var uzunluk = this.state.resim.length;
      console.log("***********");
      console.log(uzunluk);
      console.log("***********");

      var image = <input style={{marginTop:20, width:'80%'}} type="file" name="image" accept="image/*" onChange={(e)=>this.imageChange(e, uzunluk)}/>

      var veriler = {
        id: uzunluk,
        data : image,
        type: "resim",
      }


      var dizi = this.state.data;
      dizi[dizi.length] = veriler;
      this.setState({
        data: dizi,
        resim: veriler
      })
    }
  }



  render(){

    console.log(this.state.data);

    return (
      <div className="App">

        <div>
          <input id="titleinput" name="title" value={this.state.title} onChange={this.handleTitleChange} placeholder="Başlık" />
          {this.state.blog}

          {this.state.data.length > 0 ?

            <div>
              {this.state.data.map((v,k) => {
                return(
                  <div key={k} >{v.data}</div>
                );
              })}
            </div>

            :

            null
          }

          <div className="secenekler">
            <ul id="ul">
            {this.state.livalue.map((v,k) => {
              return(
                <li id="li" value={v} key={k} onClick={(e)=>this.click(e,v)}>{v}</li>
              );
            })}

            </ul>
          </div>


        </div>

      </div>
    );
  }

}

export default CreateBlog;
