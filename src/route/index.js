import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import About from "../page/about/about";
import Readring from "../page/rendering/rendering";
import Home from "../page/home/home";
import ReduxPage from "../page/reduxpage/reduxpage";

//如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。
// const About =() => {return import("../page/about/about")}
// const ReduxPage =() => {return import("../page/reduxpage/reduxpage")};
// const Readring =() => {return import("../page/rendering/rendering");}
// const Home = () => {return import("../page/home/home");}




const customHistory = createBrowserHistory();



// function formatName(user){
//   return user.first +"" +user.last
// }
//路由
function APP() {
    return (
    <Router  history={customHistory} >
          <Route exact path="/about" component={About} />
          <Route exact path="/reduxpage" component={ReduxPage} />
          <Route exact path="/readring" component={Readring} />
          <Route exact path="/" component={Home} />
   </Router>
  )
}


export default APP
