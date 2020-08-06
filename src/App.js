import React from 'react';
import './App.css';
import Header from './screens/header';
import Subjects from './screens/subjects';
import SubjectDetail from './screens/subjectDetail';
import AdminCreateBlog from './screens/admin/adminCreateBlog';
import AboutUs from './screens/AboutUs';
import AdminHome from './screens/admin/adminHome';
import AdminLogin from './screens/admin/adminLogin';
import AdminCreateAboutUs from './screens/admin/createAboutUs';
import DeletePost from './screens/admin/deletePost';
import PostDetail from './screens/admin/postDetail';
import AdminCreateProject from './screens/admin/adminCreateProjects';
import Projects from './screens/projects';
import ProjectDetail from './screens/projectDetail';
import DeleteProject from './screens/admin/deleteProject';
import EditProject from './screens/admin/editproject';


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
                <Route path={"/subjects/subjectDetail/:id/:title"} component={SubjectDetail} />
                <Route path={"/adminCreateBlog"} component={AdminCreateBlog} />
                <Route path={"/Hakkımda"} component={AboutUs} />
                <Route path={"/adminHome"} component={AdminHome} />
                <Route path={"/adminLogin"} component={AdminLogin} />
                <Route path={"/adminCreateAboutUs"} component={AdminCreateAboutUs} />
                <Route path={"/deletepost"} component={DeletePost} />
                <Route path={"/postdetail/:id/:title"} component={PostDetail} />
                <Route path={"/adminCreateProject"} component={AdminCreateProject} />
                <Route path={"/projects"} exact component={Projects} />
                <Route path={"/projects/projectDetail/:id/:title"} component={ProjectDetail} />
                <Route path={"/deleteproject"} component={DeleteProject} />
                <Route path={"/editproject/:id/:title"} component={EditProject} />

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
