import React from 'react';
import './../css/admincreateblog.css';
import Color from "../utils/colors";

import Icon, { FontAwesome, Feather } from 'react-web-vector-icons';




class CreateBlog extends React.Component{

  constructor(props){
    super(props);

    this.key = 1;
    this.dizino=0;

    this.state = {
      data : [],
      show : false,
      username: "",
      title:'',
      options: null,
      activeId:null,
      blog: null,
      livalue:["yazı", "resim","alt başlık"],
      fileupl: '',
      yazi:[],
      resim:[],
      circle: false,
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

  imageChange = (e) =>{
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



  select = (e) => {
    console.log("seçim yapıldı");
    var id = e.target.id;
    const {data} = this.state;

    /*if(data[id] === "yazı"){

      this.setState({
        options:true,
      })
    }*/
  }


  click = (e,v) => {

    if(v === "yazı"){
      var yazi = <textarea  onFocus={(e)=>this._onFocus(e)} onBlur={(e)=>this._onBlur(e)} className="multitext" id={this.key} style={{marginTop:20, width:'80%', color:'black', fontSize:12}} type="text"></textarea>

      var uzunluk = this.state.yazi.length;

      var veriler = {
        id: this.key,
        data : yazi,
        type: "yazı",
        color:'black',
        size:12,
        no:this.dizino,

      }

      this.dizino++;
      this.key++;

      var dizi = this.state.data;
      dizi[dizi.length] = veriler;
      this.setState({
        data: dizi,

      })
    }else if (v === "alt başlık") {
      var yazi = <input onFocus={(e)=>this._onFocus(e)} key={this.key} style={{marginTop:20, width:'80%', color:"#000000", fontSize:22, fontWeight:'bold'}} id={this.key} type="text" />
      var veriler = {
        id: this.key,
        data : yazi,
        type: "alt başlık",
        no: this.dizino,

      }

      this.dizino++;
      this.key++;

      var dizi = this.state.data;
      dizi[dizi.length] = veriler;
      this.setState({
        data: dizi,

      })
    }else {

      var uzunluk = this.state.resim.length;

      var image = <input key={this.key} id={this.key} style={{marginTop:20, width:'80%'}} type="file" name="image" accept="image/*" onChange={(e)=>this.imageChange(e)}/>

      var veriler = {
        id: this.key,
        data : image,
        type: "resim",
        no:this.dizino,
      }

      this.dizino++;
      this.key++;

      var dizi = this.state.data;
      dizi[dizi.length] = veriler;
      this.setState({
        data: dizi,

      })
    }
  }

  _onFocus = (e) => {

    if(e.target.id === "titleinput"){
      this.setState({
        activeId: null,
        ptions: false,
        show: false,
      })
    }else {
      var id = e.target.id;
      id = parseInt(id)

      var type;
      var no;

      for (var i = 0; i < this.state.data.length; i++) {
        if(this.state.data[i].id === id){
          no = this.state.data[i].no;
        }
      }

      type = this.state.data[no].type;

      if(type === "yazı"){
        this.setState({
          options: true,
          show: true,
          activeId: e.target.id,
        });
      }else {
        console.log(e.target.key);
        this.setState({
          options: true,
          show: true,
          activeId: e.target.id,
        });
      }


    }
  }

  _onBlur = (e) => {

  }

  Change = (e, id) => {
    var newsize = parseInt(e.target.value);
    var data = this.state.data;

    console.log(data);

    var newdata = [];


    for (var i = 0; i < data.length; i++) {
      if(data[i].id === id){

        var color = data[i].color;

        var yazi =  <textarea onFocus={(e)=>this._onFocus(e)} onBlur={(e)=>this._onBlur(e)} className="multitext" id={id} style={{marginTop:20, width:'80%', color:color, fontSize:newsize}} type="text"></textarea>

        var veriler = {
          id: id,
          data : yazi,
          type: "yazı",
          color:data[i].color,
          size:newsize,
          no:data[i].no,

        }

        newdata[i] = veriler;
      }else {
        newdata[i] = data[i];
      }
    }
    console.log(newdata);

    this.setState({
      data: newdata,
    })
  }



  colorChange = (newcolor) => {

    var data = this.state.data;

    var newdata = [];
    var active = parseInt(this.state.activeId)

    for (var i = 0; i < data.length; i++) {


      if(data[i].id === active){
        console.log("girdim");
        var size = data[i].size;

        var yazi =  <textarea  onFocus={(e)=>this._onFocus(e)} onBlur={(e)=>this._onBlur(e)} className="multitext" id={active} style={{marginTop:20, width:'80%', color:newcolor, fontSize:size}} type="text"></textarea>

        var veriler = {
          id: active,
          data : yazi,
          type: "yazı",
          color:newcolor,
          size:data[i].size,
          no:data[i].no,

        }

        newdata[i] = veriler;
      }else {
        newdata[i] = data[i];
      }
    }
    console.log(newdata);

    this.setState({
      data: newdata,
    })
  }


  /*
    KUTU SİLME İŞLEMİ
  */

  remove = () => {
    var removeid = parseInt(this.state.activeId);
    var length = this.state.data.length;
    var data = this.state.data;
    var silkontrol=0;
    var newdata=[];
    var newdataid=0;

    for(let i = 0; i < length; i++){
      if(data[i].id === removeid){
        silkontrol=1;
      }else {
        if(silkontrol===0){
          newdata[newdataid] = data[i];
          newdataid++;
        }else {
          var id = data[i].id;
          if(data[i].type==="yazı"){
            var color = data[i].color;
            var size = data[i].size;

            var yazi = <textarea  onFocus={(e)=>this._onFocus(e)} onBlur={(e)=>this._onBlur(e)} className="multitext" id={id} style={{marginTop:20, width:'80%', color:color, fontSize:size}} type="text"></textarea>

            var veriler = {
              id: id,
              data : yazi,
              type: "yazı",
              color:data[i].color,
              size:data[i].size,
              no: newdataid,

            }
            newdata[newdataid] = veriler;
            newdataid++;
          }else if(data[i].type==="alt başlık") {

            var yazi = <input onFocus={(e)=>this._onFocus(e)} key={id} style={{marginTop:20, width:'80%', color:"#000000", fontSize:22, fontWeight:'bold'}} id={id} type="text" />
            var veriler = {
              id: id,
              data : yazi,
              type: "alt başlık",
              no:newdataid,

            }
            newdata[newdataid] = veriler;
            newdataid++;

          }else {
            var image = <input key={id} id={id} style={{marginTop:20, width:'80%'}} type="file" name="image" accept="image/*" onChange={(e)=>this.imageChange(e)}/>

            var veriler = {
              id: id,
              data : image,
              type: "resim",
              no:newdataid,
            }
            newdata[newdataid] = veriler;
            newdataid++;
          }//else
        }
      }
    }//for

    this.setState({
      data: newdata,
    })
  }



  render(){

    return (
      <div className="App">
        <div className="createBorder">
          <div style={{padding:10}}>
            <input onFocus={this._onFocus} id="titleinput" name="title" value={this.state.title} onChange={this.handleTitleChange} placeholder="Başlık" />
            {this.state.blog}

            <form>

            {this.state.data.length > 0 ?

              <div>
                {this.state.data.map((v,k) => {
                  if(v.type === "yazi"){
                    return(
                      <div key={k}>{v.data}</div>
                    );
                  }else {
                    return(
                      <div key={k}>{v.data}</div>
                    );
                  }

                })}
              </div>

              :

              null
            }

            </form>

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

        <div className="feature" style={{width:'20%'}}>

          {this.state.options === true || this.state.show === true ?

              <div>

              {this.state.data.map( (v,k) => {


                if(v.id === parseInt(this.state.activeId)){

                  if(v.type === "yazı"){
                    return(
                      <div key={k}>

                        <div className="featureNameBorder">
                          <h2 style={{padding:10}}>TEXT</h2>
                        </div>

                        <div style={{margin:10}}>
                          Yazı Boyutu<br/>

                          <select id="cars" value={v.size} onChange={(e) => this.Change(e,v.id)}>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                          </select>

                        </div>

                        <div style={{margin:10}}>
                          Yazı Rengi<br/>

                          <div style={{backgroundColor: v.color, width:30, height:30}}></div>

                          <Color colorChange={this.colorChange}/>

                        </div>

                        <div style={{margin:10}}>

                          <button value="remove" type="button" onClick={this.remove}>KALDIR</button>

                        </div>


                      </div>
                    );
                  }else if (v.type === "alt başlık") {


                    return(
                      <div key={k}>
                        <div className="featureNameBorder">
                          <h2 style={{padding:10}}>ALT BAŞLIK</h2>
                        </div>

                        <div style={{margin:10}}>

                          <button value="remove" type="button" onClick={this.remove}>KALDIR</button>

                        </div>

                      </div>
                    );
                  }
                  else {
                    return(
                      null
                    );
                  }
                }
              })}

              </div>
              :
              null
          }


        </div>
      </div>
    );
  }

}

export default CreateBlog;
