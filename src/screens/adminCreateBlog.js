import React from 'react';
import './../css/admincreateblog.css';
import Color from "../utils/colors";
import Textarea from "../utils/textarea";
import Input from "../utils/input";
import Image from "../utils/image";

import Icon, { FontAwesome, Feather } from 'react-web-vector-icons';




class CreateBlog extends React.Component{

  constructor(props){
    super(props);

    this.key = 1;
    this.dizino=0;
    this.ref = []

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

  }

  componentDidMount(){

  }

  handleTitleChange = (e) =>{
    this.setState({
      title: e.target.value,
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
      //var yazi = <textarea  onFocus={(e)=>this._onFocus(e)} onBlur={(e)=>this._onBlur(e)} className="multitext" id={this.key} style={{marginTop:20, width:'80%', color:'black', fontSize:12}} type="text"></textarea>

      this.ref[this.dizino] = React.createRef()
      var yazi = <Textarea id={this.key} dizino={this.dizino} color="black" size={12} ref={this.ref[this.dizino]} focus={this._onFocus} />

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
      this.ref[this.dizino] = React.createRef()
      var yazi = <Input id={this.key} dizino={this.dizino} color="black" size={12} ref={this.ref[this.dizino]} focus={this._onFocus} />

      veriler = {
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

      console.log("image");
      this.ref[this.dizino] = React.createRef()
      var image = <Image id={this.key} dizino={this.dizino} ref={this.ref[this.dizino]} path={this.imagePath} />

      var veriler = {
        id: this.key,
        data : image,
        type: "resim",
        path: "",
        no:this.dizino,
        file: null,
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

  imagePath = (no) => {

    var data = this.state.data;
    data[no].path = this.ref[no].current.state.fileurl;
    data[no].file = this.ref[no].current.state.selectedFile;

    this.setState({
      data: data,
    })
  }


  _onFocus = (id) => {
    this.setState({
      activeId: id,
      options:true,
      show:true,
    })

  }

  _onBlur = (e) => {

  }


  colorChange = (newcolor) => {

  var data = this.state.data;

  var newdata = [];
  var active = parseInt(this.state.activeId)

  for (var i = 0; i < data.length; i++) {

    if(data[i].id === active){
      console.log("girdim");
      var dizino = data[i].no;

      this.ref[dizino].current.setState({
        color: newcolor,
      });

      data[i].color = newcolor;
      this.setState({
        circle: !this.state.circle,
      })

      break;
    }
  }

}

Change = (e) => {
  var data = this.state.data;
  var active = parseInt(this.state.activeId)
  for (var i = 0; i < data.length; i++) {
    if(data[i].id === active){
      console.log("girdim");
      var dizino = data[i].no;

      this.ref[dizino].current.setState({
        size: parseInt(e.target.value),
      });

      data[i].size = parseInt(e.target.value);
      this.setState({
        circle: !this.state.circle,
      })
      break;
    }
  }
}

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
      data[i].data = null;
      newdata[newdataid] = data[i];
      newdataid++;
    }else {
      if(silkontrol===0){
        newdata[newdataid] = data[i];
        newdataid++;
      }else {

        data[i].no=newdataid;
        newdata[newdataid] = data[i];
        newdataid++;

      }
    }
  }//for

  console.log(newdata);


  this.setState({
    data: newdata,
  })
}

  imageset = (e, id) => {
    e.preventDefault();
    this._onFocus(id);
  }

  kaydet = (e) => {
    e.preventDefault();


    var data = this.state.data;
    var length = data.length;

    for(let i = 0; i < length; i++){
      if(data[i].data !== null){
        var formData = new FormData();

        if(data[i].type === "yazı"){
          var form = {
            text: this.ref[data[i].no].current.state.text,
            color: this.ref[data[i].no].current.state.color,
            size: this.ref[data[i].no].current.state.size.toString(),
            type: "yazi",
          }

          this.ekleFetch(form, "text");
        }else if (data[i].type === "alt başlık") {
          var form = {
            text: this.ref[data[i].no].current.state.text,
            type: "alt baslik",
          }
          this.ekleFetch(form, "alt baslik");
        }else {
          if(data[i].path !== ""){
            console.log(data[i].file);
            /*var form = {
              file : data[i].file,
              type : "file",
            }*/
            var form = new FormData();
            form.append("file", data[i].file);
            form.append("type", "file");

            this.ekleFetch(form, "file");
          }
        }
      }
    }//for
  }


  ekleFetch = async (formData, type) => {


    var url = "http://192.168.1.105:8080/post/createPost/";
    var url = "http://192.168.1.105:8080/post/createPostFile/";
    var urlimage = ""

    if(type === "text"){
      fetch(url, {
          method: 'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(formData),

        }).then(response => response.json() )
          .then((response) => {
              console.log(response);
        }).catch(error =>  alert(error));
    }else if (type === "alt baslik") {
        fetch(url, {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(formData),

          }).then(response => response.json() )
            .then((response) => {
                console.log(response);
          }).catch(error =>  alert(error));
    }else {
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers:{'Content-Type':'multipart/form-data; name:file '},

        }).then(response => response.json() )
          .then((response) => {
              console.log(response);
        }).catch(error =>  alert(error));
    }


    /*
    if(type === "text"){
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers:{
            'Accept':"application/json",
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => response.json() )
          .then((response) => {
              console.log(response);
        }).catch(error =>  alert("Hata"));
    }
    */


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

                  if(v.data !== null){
                    if(v.type === "yazi"){
                      return(
                        <div key={k}>{v.data}</div>
                      );
                    }else if(v.type==="resim"){
                      if(v.path !== "" && v.data !== null){
                        return (
                          <div key={k}>
                            <div>{v.data}</div>
                            <div style={{marginTop:10}}><button onClick={(e)=>this.imageset(e, v.id)}><img style={{width:200, height:200}} src={v.path}/></button> </div>
                          </div>
                        );
                      }else {
                        return(
                          <div key={k}>{v.data}</div>
                        )
                      }
                    }else {
                      return(
                        <div key={k}>{v.data}</div>
                      );
                    }
                  }else {
                    return null;
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

            <div style={{marginTop:30}}>
              <button onClick={this.kaydet} style={{width:100, height:50}}>Kaydet</button>
            </div>

          </div>
        </div>

        <div className="feature" style={{width:'20%'}}>

          {this.state.options === true || this.state.show === true ?

              <div>

              {this.state.data.map( (v,k) => {

                if(v.id === parseInt(this.state.activeId)){
                  console.log(v.type);
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

                          <button className="removeButton" value="remove" type="button" onClick={this.remove}>KALDIR</button>

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
                      <div key={k}>
                        <div className="featureNameBorder">
                          <h2 style={{padding:10}}>Resim</h2>
                        </div>

                        <div style={{margin:10}}>

                          <button value="remove" type="button" onClick={this.remove}>KALDIR</button>

                        </div>

                      </div>
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
