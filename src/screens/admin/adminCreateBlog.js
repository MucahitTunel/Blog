import React from 'react';
import './../../css/admin/admincreateblog.css';
import Color from "../../utils/colors";
import Textarea from "../../utils/textarea";
import Input from "../../utils/input";
import Image from "../../utils/image";

import AdminHeader from './adminHeader';

import Header from '../header';

import {connect, dispatch} from 'react-redux';

import Icon, { FontAwesome, Feather } from 'react-web-vector-icons';




class CreateBlog extends React.Component{

  constructor(props){
    super(props);

    this.key = 1;
    this.dizino=0;
    this.ref = []
    this.fetchno = 0;

    this.tempTitle = "";

    this.subjectkontrol = false;
    this.imagefetchkontrol = false;
    this.imagedata = [];
    this.removeids = [];


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
      subjectid : null,
      publish: false,

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

    this.subjectkontrol = false;

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
        filename: "",
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
    data[no].filename = this.ref[no].current.state.filename;

    console.log(data[no].filename);

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
  this.removeids[this.removeids.length] = removeid;
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


  elements = () => {
    var formdata = new FormData();
    var data = this.state.data;
    var length = data.length;
    var txtkontrol = 0;
    this.imagedata = [];

    console.log("title kontrol");
    console.log(this.tempTitle);
    console.log(this.state.title);

    if(this.tempTitle !== this.state.title){
      var form = {
        title : this.state.title,
        id: this.state.subjectid,
        type: "title",
        elementid : 0,
      }
      formdata.append('title', JSON.stringify(form));
    }


    for(let i = 0; i < length; i++){
      if(data[i].data !== null){

        if(data[i].type === "resim"){
          if(data[i].path !== ""){
            console.log("resim varrrrrrrrrrr");
            this.imagedata[this.imagedata.length] = data[i].no;
            this.imagefetchkontrol = true;
          }
        }


        if(data[i].type === "yazı"){
          var form = {
            text: this.ref[data[i].no].current.state.text,
            color: this.ref[data[i].no].current.state.color,
            size: this.ref[data[i].no].current.state.size.toString(),
            type: "yazi",
            id: this.state.subjectid,
            elementid : data[i].id,
          }
          txtkontrol = 1;
          formdata.append(i.toString(),JSON.stringify(form));

        }else if (data[i].type === "alt başlık") {
          var form = {
            text: this.ref[data[i].no].current.state.text,
            type: "alt baslik",
            id: this.state.subjectid,
            elementid : data[i].id,
          }
          txtkontrol = 1;
          formdata.append(i.toString(),JSON.stringify(form));
        }else {
        }
      }
    }//for

    if(txtkontrol = 0){
        if(this.imagefetchkontrol === true){
          this.setState({
            circle: !this.state.circle,
          })
        }
    }else {
      this.ekleFetch(formdata)
    }
  }


  kaydet = (e) => {
    e.preventDefault();

    if(this.removeids.length > 0){
      this.removefetch();
    }


    var formdata = new FormData();
    if(this.state.subjectid === null){
      if(this.state.title !== ""){
        this.tempTitle = this.state.title;
        var form = {
          title : this.state.title,
          publish: "no",
        }
        formdata.append("newsubject", JSON.stringify(form));
        this.ekleFetch(formdata, "newsubject");
      }
    }else {
      //this.subjectkontrol = true;
      this.elements();
    }
  }


  ekleFetch = async (formData, type="text") => {


    var url = "http://192.168.1.108:8080/post/createPost/";

    var newsubjecturl = "http://192.168.1.108:8080/post/createNewSubject/"

    if(type === "newsubject"){
      console.log("new subject");
      fetch(newsubjecturl, {
          method: 'POST',
          header: {
            'Content-Type' : 'multipart/form-data',
          },
          body: formData,

        }).then(response => response.json() )
          .then((response) => {
              if(response.error){
                alert("Hata : " + response.error)
              }else {
                console.log(response);
                this.subjectkontrol = true;
                this.setState({
                  subjectid: response.result.insertId,
                })

              }
        }).catch(error =>  alert(error));
    }else {
      fetch(url, {
          method: 'POST',
          header: {
            'Content-Type' : 'multipart/form-data',
          },
          body: formData,

        }).then(response => response.json() )
          .then((response) => {
              this.setState({
                circle: !this.state.circle,
              })
        }).catch(error =>  alert(error));
    }
  }

  imagefetch=()=>{
    var newurl = "http://192.168.1.108:8080/post/createPostFile/";
    var data = this.state.data;
    this.imagefetchkontrol = false;
    for (var i = 0; i < this.imagedata.length; i++) {
      var form = new FormData();
      form.append("file", data[this.imagedata[i]].file);
      form.append("type", "file");
      form.append("id", this.state.subjectid);
      form.append("elementid", data[this.imagedata[i]].id);
      form.append("filename", data[this.imagedata[i]].filename);

      fetch(newurl, {
          method: 'POST',
          body: form,

        }).then(response => response.json() )
          .then((response) => {
              console.log(response);
        }).catch(error =>  alert(error));
    }
  }


  removefetch = () => {

    console.log("remove fetch");
    console.log(this.removeids);

    var url = "http://192.168.1.108:8080/post/removedata/";
    var form = new FormData();
    form.append("remove", JSON.stringify(this.removeids));
    form.append("id",JSON.stringify(this.state.subjectid));

    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type' : 'multipart/form-data',
      },
      body: form,

    }).then(response => response.json() )
      .then((response) => {
        if(response.error){
          console.log("HATA");
        }else {
          this.removeids=[];
        }
    }).catch(error =>  alert(error));

  }


  render(){

    if(this.subjectkontrol === true && this.state.data.length > 0){
      console.log("come on");
      this.subjectkontrol = false;
      this.elements();
    }

    if(this.imagefetchkontrol === true && this.imagedata.length > 0){
      console.log("imagefetch");
      this.subjectkontrol = false;
      this.imagefetch();
    }

    return (
      <div className="App" style={{width:this.props.width}}>

        <AdminHeader />

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
              <ul id="uladmin">
              {this.state.livalue.map((v,k) => {
                return(
                  <li id="liadmin" value={v} key={k} onClick={(e)=>this.click(e,v)}>{v}</li>
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

const mapStateToProps = state => ({ width: state.width, mobileHeaderActive:state.mobileHeader })

const mapDispatchToProps = () => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog)
