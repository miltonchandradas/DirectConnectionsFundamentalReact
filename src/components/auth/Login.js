import React, { useState, useContext, useEffect } from "react";

import {
   FormGroup,
   FormInput,
   FormItem,
   FormLabel,
} from "fundamental-react/lib/Forms";
/* import { LayoutGrid } from "fundamental-react/lib/LayoutGrid";
import { Panel } from "fundamental-react/lib/Panel"; */
import { Button } from "fundamental-react/lib/Button";

import { Container, Row, Column } from "fundamental-react";

import FacebookLogin from "react-facebook-login";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

const Login = (props) => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);

   const {
      login,
      error,
      clearError,
      isAuthenticated,
      fbResponse,
   } = authContext;

   useEffect(() => {
      if (isAuthenticated) {
         props.history.push("/myaccount");
      }

      if (error) {
         console.log("Error message strip should show...");
         messageContext.setMessage(error, "error", true);
         clearError();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated, props.history, error]);

   const [user, setUser] = useState({
      email: "",
      password: "",
   });

   const [isNew, setIsNew] = useState(true);
   const [isEmailValid, setIsEmailValid] = useState(false);
   const [isPasswordValid, setIsPasswordValid] = useState(false);

   const { email, password } = user;

   const onChangeHandler = (e) => {
      console.log("Change handler is called...");

      setUser({ ...user, [e.target.name]: e.target.value });

      setIsNew(false);

      if (e.target.name === "email")
         setIsEmailValid(validateEmail(e.target.value));

      if (e.target.name === "password")
         setIsPasswordValid(validatePassword(e.target.value));
   };

   const validateEmail = (emailValue) => {
      console.log("Validate email is called...");

      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
         return true;

      return false;
   };

   const validatePassword = (passwordValue) => {
      if (passwordValue.length < 4) return false;

      return true;
   };

   const onSubmitHandler = (e) => {
      e.preventDefault();

      console.log("Submit handler is called...");

      if (!isEmailValid || !isPasswordValid) {
         messageContext.setMessage(
            "Email or password is invalid...",
            "error",
            true
         );
         return;
      }

      login({
         email,
         password,
      });
   };

   const responseFacebook = (response) => {
      console.log("Entering responseFacebook...");
      fbResponse(response);
   };

   return (
      <section className="section-login login">
         <h2>Login</h2>

         <Container>
            <Row>
               <Column>
                  <h1>
                     Account <span className="h1 h1-span">Login</span>
                  </h1>
                  <FormGroup>
                     <FormItem>
                        <FormLabel htmlFor="input-3" required>
                           Email
                        </FormLabel>
                        <FormInput
                           id="input-3"
                           name="email"
                           placeholder="Email"
                           type="email"
                           onChange={onChangeHandler}
                           validationState={
                              !isNew
                                 ? isEmailValid
                                    ? {
                                         state: "success",
                                         text: "The email is valid...",
                                      }
                                    : {
                                         state: "",
                                         text: "Please enter a valid email...",
                                      }
                                 : {
                                      state: "",
                                      text: "Please enter your email...",
                                   }
                           }
                        />
                     </FormItem>
                  </FormGroup>
                  <FormGroup>
                     <FormItem>
                        <FormLabel htmlFor="input-4" required>
                           Password
                        </FormLabel>
                        <FormInput
                           id="input-4"
                           name="password"
                           placeholder="Password"
                           onChange={onChangeHandler}
                           validationState={
                              !isNew
                                 ? isPasswordValid
                                    ? {
                                         state: "success",
                                         text:
                                            "The password length is valid...",
                                      }
                                    : {
                                         state: "",
                                         text:
                                            "Password must be at  least 4 characters...",
                                      }
                                 : {
                                      state: "",
                                      text: "Please enter your password...",
                                   }
                           }
                           type="password"
                        />
                     </FormItem>
                  </FormGroup>

                  <Button className="fr-button" onClick={onSubmitHandler}>
                     Login
                  </Button>
               </Column>
            </Row>
            <Row className="fr-panel">
               <Column>
                  <h1>
                     Login with <span className="h1 h1-span">Facebook</span>
                  </h1>
                  <div className="fb-container">
                     <FacebookLogin
                        appId="716272092446596"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                     />
                  </div>
               </Column>
            </Row>
         </Container>
      </section>
   );
};

export default Login;
