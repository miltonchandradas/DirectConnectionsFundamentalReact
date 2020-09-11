import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Message from "./components/layout/Message";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/pages/NotFound";
import Learn from "./components/pages/Learn";
import MatchesState from "./context/matches/MatchesState";
import AuthState from "./context/auth/AuthState";
import MessageState from "./context/message/MessageState";
import OpportunityState from "./context/opportunity/OpportunityState";
import ProductState from "./context/product/ProductState";
import ServiceState from "./context/service/ServiceState";
import PrivateRoute from "./components/routing/PrivateRoute";

import "./App.css";
import "./resources/icons/Fonts/SAP-icons.woff";
import "./resources/72_Web/72-Regular.woff";

import MyAccount from "./components/mypages/MyAccount";
import MyOrders from "./components/mypages/MyOrders";
import MyKarmaPoints from "./components/mypages/MyKarmaPoints";
import MyOpportunities from "./components/mypages/MyOpportunities";
import VolunteeringOpportunities from "./components/mypages/VolunteeringOpportunities";
import MyServices from "./components/mypages/MyServices";
import Services from "./components/mypages/Services";
import MyProducts from "./components/mypages/MyProducts";
import MyFriends from "./components/mypages/MyFriends";
import MyRequests from "./components/mypages/MyRequests";
import MyLocation from "./components/mypages/MyLocation";
import MyDashboard from "./components/mypages/MyDashboard";
import AboutMe from "./components/mypages/AboutMe";

const App = () => {
   return (
      <AuthState>
         <OpportunityState>
            <MatchesState>
               <ProductState>
                  <ServiceState>
                     <MessageState>
                        <Router>
                           <Navbar />
                           <Message />
                           <Switch>
                              <Route exact path="/" component={Home} />
                              <Route exact path="/login" component={Login} />

                              <PrivateRoute
                                 exact
                                 path="/myaccount"
                                 component={MyAccount}
                              />
                              <PrivateRoute
                                 exact
                                 path="/myorders"
                                 component={MyOrders}
                              />
                              <PrivateRoute
                                 exact
                                 path="/mykarmapoints"
                                 component={MyKarmaPoints}
                              />
                              <PrivateRoute
                                 exact
                                 path="/myopportunities"
                                 component={MyOpportunities}
                              />
                              <PrivateRoute
                                 exact
                                 path="/volunteeringopportunities"
                                 component={VolunteeringOpportunities}
                              />
                              <PrivateRoute
                                 exact
                                 path="/myservices"
                                 component={MyServices}
                              />
                              <PrivateRoute
                                 exact
                                 path="/services"
                                 component={Services}
                              />
                              <PrivateRoute
                                 exact
                                 path="/myproducts"
                                 component={MyProducts}
                              />
                              <PrivateRoute
                                 exact
                                 path="/myfriends"
                                 component={MyFriends}
                              />
                              <PrivateRoute
                                 exact
                                 path="/myrequests"
                                 component={MyRequests}
                              />
                              <PrivateRoute
                                 exact
                                 path="/mylocation"
                                 component={MyLocation}
                              />
                              <PrivateRoute
                                 exact
                                 path="/mydashboard"
                                 component={MyDashboard}
                              />
                              <PrivateRoute
                                 exact
                                 path="/aboutme"
                                 component={AboutMe}
                              />
                              <Route
                                 exact
                                 path="/register"
                                 component={Register}
                              />
                              <Route exact path="/learn" component={Learn} />
                              <Route component={NotFound} />
                           </Switch>
                        </Router>
                     </MessageState>
                  </ServiceState>
               </ProductState>
            </MatchesState>
         </OpportunityState>
      </AuthState>
   );
};

export default App;
