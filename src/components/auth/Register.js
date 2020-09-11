import React, { useState, useContext, useEffect } from "react";
import {
   FormGroup,
   FormInput,
   FormItem,
   FormLabel,
} from "fundamental-react/lib/Forms";
/* 
import { LayoutGrid } from "fundamental-react/lib/LayoutGrid";
import { Panel } from "fundamental-react/lib/Panel"; */

import { Container, Row, Column } from "fundamental-react";
import { Button } from "fundamental-react/lib/Button";
import FacebookLogin from "react-facebook-login";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

const Register = (props) => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);

   const {
      register,
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

   const [isNew, setIsNew] = useState(true);
   const [isEmailValid, setIsEmailValid] = useState(false);
   const [isPasswordValid, setIsPasswordValid] = useState(false);

   const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
   });

   const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      address,
   } = user;

   const onChangeHandler = (e) => {
      console.log("Change handler is called...");

      setUser({ ...user, [e.target.name]: e.target.value });

      if (e.target.name === "email")
         setIsEmailValid(validateEmail(e.target.value));

      if (e.target.name === "password" || e.target.name === "confirmPassword")
         setIsPasswordValid(validatePassword(e.target.value));
   };

   const validateEmail = (emailValue) => {
      console.log("Validate email is called...");

      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
         return true;

      setIsNew(false);
      return false;
   };

   const validatePassword = (passwordValue) => {
      console.log("Validate password is called...");

      if (passwordValue.length < 4) {
         setIsNew(false);
         return false;
      }

      console.log(
         "Password length is greater than or equal to 4 characters..."
      );

      return true;
   };

   const onSubmitHandler = (e) => {
      e.preventDefault();

      if (
         firstName === "" ||
         lastName === "" ||
         email === "" ||
         password === "" ||
         confirmPassword === "" ||
         address === ""
      ) {
         messageContext.setMessage("Please enter all fields...", "error", true);
         return;
      }

      if (password !== confirmPassword) {
         messageContext.setMessage("Passwords do not match...", "error", true);
         return;
      }

      register({
         firstName,
         lastName,
         email,
         password,
         address,
      });
      console.log("Register submit...");
   };

   const responseFacebook = (response) => {
      console.log("Entering responseFacebook...");
      fbResponse(response);
   };

   return (
      <section className="section-register register">
         <h2>Register</h2>
         <Container>
            <Row className="fr-panel">
               <Column>
                  <h1>
                     Account <span className="h1 h1-span">Register</span>
                  </h1>
                  <FormGroup>
                     <FormItem>
                        <FormLabel htmlFor="input-1" required>
                           First Name
                        </FormLabel>
                        <FormInput
                           id="input-1"
                           name="firstName"
                           onChange={onChangeHandler}
                           placeholder="First Name"
                           required
                        />
                     </FormItem>
                  </FormGroup>
                  <FormGroup>
                     <FormItem>
                        <FormLabel htmlFor="input-2" required>
                           Last Name
                        </FormLabel>
                        <FormInput
                           id="input-2"
                           name="lastName"
                           onChange={onChangeHandler}
                           placeholder="Last Name"
                           required
                        />
                     </FormItem>
                  </FormGroup>
                  <FormGroup>
                     <FormItem>
                        <FormLabel htmlFor="input-3" required>
                           Email
                        </FormLabel>
                        <FormInput
                           id="input-3"
                           name="email"
                           onChange={onChangeHandler}
                           placeholder="Email"
                           type="email"
                           required
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
                           onChange={onChangeHandler}
                           placeholder="Password"
                           type="password"
                           required
                           validationState={
                              !isNew
                                 ? isPasswordValid
                                    ? {
                                         state: "success",
                                         text: "The password is valid...",
                                      }
                                    : {
                                         state: "",
                                         text:
                                            "Password must be at  least 4 characters (AND) passwords must match...",
                                      }
                                 : {
                                      state: "",
                                      text: "Please enter your password...",
                                   }
                           }
                        />
                     </FormItem>
                  </FormGroup>
                  <FormGroup>
                     <FormItem>
                        <FormLabel htmlFor="input-5" required>
                           Confirm Password
                        </FormLabel>
                        <FormInput
                           id="input-5"
                           name="confirmPassword"
                           onChange={onChangeHandler}
                           placeholder="Confirm Password"
                           type="password"
                           required
                           validationState={
                              !isNew
                                 ? isPasswordValid
                                    ? {
                                         state: "success",
                                         text: "The password is valid...",
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
                        />
                     </FormItem>
                  </FormGroup>
                  <FormGroup>
                     <FormItem>
                        <FormLabel htmlFor="input-4" required>
                           Address
                        </FormLabel>
                        <FormInput
                           id="input-6"
                           name="address"
                           placeholder="Address"
                           onChange={onChangeHandler}
                        />
                     </FormItem>
                  </FormGroup>
                  <Button className="fr-button" onClick={onSubmitHandler}>
                     Register
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
                        fields="name,email,address,picture"
                        callback={responseFacebook}
                     />
                  </div>
               </Column>
            </Row>
         </Container>
      </section>
   );
};

export default Register;
