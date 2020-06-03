import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Message from "./components/layout/Message";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/pages/NotFound";
import Learn from "./components/pages/Learn";
import AuthState from "./context/auth/AuthState";
import MessageState from "./context/message/MessageState";
import PrivateRoute from "./components/routing/PrivateRoute";

import "./App.css";
import MyDashboard from "./components/mypages/MyDashboard";

const App = () => {
   return (
      <AuthState>
         <MessageState>
            <Router>
               <Navbar />
               <Message />
               <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/mydashboard" component={MyDashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/learn" component={Learn} />
                  <Route component={NotFound} />
               </Switch>
            </Router>
         </MessageState>
      </AuthState>
   );
};

export default App;
