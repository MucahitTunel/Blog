import React from 'react';
import './App.css';
import Header from './screens/header';
import Subjects from './screens/subjects';
import SubjectDetail from './screens/subjectDetail';
import AdminCreateBlog from './screens/admin/adminCreateBlog';
import AboutUs from './screens/AboutUs';
import Contact from './screens/Contact';
import AdminHome from './screens/admin/adminHome';

import {connect} from 'react-redux';
import {change} from "./actions";

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      data : [],
      username: "",
      activetab:2,
      path: this.props.path,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.hand = this.handleChange.bind(this);
  }

  componentDidMount(){
    console.log(this.props.path);
  }


  handleSubmit = (event) => {
    event.preventDefault();


  }

  handleChange = (event) => {

  }


  render(){


    console.log(this.state.path);

    return (

        <Router className="App">


          <div className="divide">


            <div>
              <Switch>
                <Route path={"/"} exact component={Subjects} />
                <Route path={"/Anasayfa"} component={Subjects} />
                <Route path={"/subjects"} exact component={Subjects} />
                <Route path={"/subjects/subjectDetail/:id"} component={SubjectDetail} />
                <Route path={"/adminCreateBlog"} component={AdminCreateBlog} />
                <Route path={"/Hakkımda"} component={AboutUs} />
                <Route path={"/İletişim"} component={Contact} />
                <Route path={"/adminHome"} component={AdminHome} />
              </Switch>
            </div>

          </div>



        </Router>

    );
  }
}


const mapStateToProps = state => ({ path: state.path })

const mapDispatchToProps = () => {
  return {
    change,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
