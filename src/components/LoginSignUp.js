import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../globals/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import * as globalStyles from "../globals/globalStyles";

const ContentContainer = styled.div`
   position: relative;
   display: flex;
   width: 100%;
   z-index: 1;
   flex-direction: row;
   justify-content: center;
`;

const FormContainer = styled.div`
   display: flex;
   flex-direction: column;
`;

const FieldContainer = styled.div``;

const InputField = styled.fieldset`
   border: 1px solid ${({ error }) => (error ? "red" : "black")};
   border-radius: 5px;
   padding: 0.5em;
   margin: 0 0;
   width: 22em;

   legend {
      padding: 0 7px;
      color: black;
   }

   Input {
      color: black;
      border: none;
      width: 100%;
      :focus {
         outline: none;
      }
   }
`;

const Input = styled.input``;

const FieldErrorText = styled.label`
   margin: 0.7em;
   padding: 0;
   color: red;
   font-size: 0.8em;
`;

const ThisButton = styled(globalStyles.Button)`
   margin-top: 10px;
   width: 60px;
`;

const defaultValues = {
   email: "",
   password: "",
};

const requiredFields = {
   email: true,
   password: false,
};

const defaultErrorValuesRef = {
   email: "",
   password: "",
};

const initialTouchedOrError = {
   email: false,
   password: false,
};

const email = "email";
const password = "password";

export const LoginSignUp = ({ isSignUp }) => {
   const { users, login, setUsers, logout } = useAuth();
   const navigate = useNavigate();
   const [formValues, setFormValues] = useState(defaultValues);
   const [touched, setTouched] = useState(initialTouchedOrError);
   const errorMessagesRefValues = useRef(defaultErrorValuesRef);
   const [disableSendButton, setDisableSendButton] = useState(false);
   const [forceRender, setForceRender] = useState(false);

   const getUsers = () => {
      const res = axios.get("http://localhost:3001/v1/users").then((res) => {
         setUsers(res.data);
      });
   };

   const createUser = (user) => {
      alert("creating user");
      const res = axios
         .post("http://localhost:3001/v1/users", user)
         .then((res) => {
            login({
               email: formValues.email,
               password: formValues.password,
            });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      getUsers();
   }, []);

   const performOk = () => {
      if (isSignUp) {
         const userFound = users.find(
            (user) => user.email === formValues.email
         );
         if (userFound) {
            alert(
               `${formValues.email} ya es un usuario registrado, por favor, haga LogIn`
            );
            navigate("/");
         } else {
            alert("creating user");
            createUser({
               email: formValues.email,
               password: formValues.password,
            });
            navigate("/");
         }
      } else {
         const userFound = users.find(
            (user) =>
               user.email === formValues.email &&
               user.password === formValues.password
         );
         if (userFound) {
            login(userFound);
            navigate("/");
         } else {
            alert(
               `${formValues.email} no es un usuario registrado, por favor, registrate`
            );
            navigate("/");
         }
      }
   };

   const performCancel = () => {
      navigate("/");
   };

   const handleInputChange = (e) => {
      let { name, value } = e.target;
      setFormValues({
         ...formValues,
         [name]: value,
      });
      if (value === "") {
         setTouched({
            ...touched,
            [name]: false,
         });
      } else {
         setTouched({
            ...touched,
            [name]: true,
         });
      }
   };

   function checkFieldWithRegex(field) {
      const emailRE = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/u;
      const passwordRE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/u;
      const error = false,
         noError = true;
      let result = noError;
      switch (field) {
         case email:
            result = new RegExp(emailRE).test(formValues[field]);
            break;

         case password:
            result = new RegExp(passwordRE).test(formValues[field]);
            break;

         default:
            break;
      }

      return result;
   }

   function getErrorFieldHelperText(errorField) {
      switch (errorField) {
         case email:
            return "Please, complete a valid email";

         case password:
            return "Password must be minimum eight characters, at least one letter and one number";

         default:
            return "";
      }
   }

   function validateField(field) {
      const error = false,
         noError = true;
      let validateFieldResult = noError;
      switch (field) {
         case email:
            if (formValues.email.length === 0) {
               validateFieldResult = error;
            } else {
               validateFieldResult = checkFieldWithRegex(email);
            }
            break;
         case password:
            if (formValues.password.length === 0) {
               validateFieldResult = error;
            } else {
               validateFieldResult = checkFieldWithRegex(password);
            }
            break;

         default:
            break;
      }
      let prevError = errorMessagesRefValues.current[field];
      if (!validateFieldResult) {
         errorMessagesRefValues.current[field] = getErrorFieldHelperText(field);
      } else {
         errorMessagesRefValues.current[field] = "";
      }
      if (prevError !== errorMessagesRefValues.current[field])
         setForceRender(!forceRender);
      return validateFieldResult;
   }

   useEffect(
      () => {
         let fieldValidations = [];
         Object.keys(touched).forEach((field) => {
            fieldValidations.push({ field, valid: validateField(field) });
         });

         setDisableSendButton(
            fieldValidations.some((fieldValidations) => {
               return (
                  requiredFields[fieldValidations.field] &&
                  !fieldValidations.valid
               );
            })
         );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [formValues]
   );

   let errorsForStyling = errorMessagesRefValues.current;

   for (let key in errorsForStyling) {
      errorsForStyling[key] =
         touched[key] && formValues[key].length !== 0
            ? errorsForStyling[key]
            : "";
   }

   return (
      <ContentContainer>
         <FormContainer>
            <FieldContainer>
               <InputField
                  error={
                     touched[email] &&
                     errorMessagesRefValues.current.email !== ""
                  }
               >
                  <legend>email</legend>
                  <Input
                     type="text"
                     name={email}
                     autoComplete="new-password"
                     size="50"
                     placeholder="Enter your email"
                     value={formValues.email}
                     onChange={handleInputChange}
                  />
               </InputField>
               <FieldErrorText>
                  {touched[email] && errorMessagesRefValues.current.email}
               </FieldErrorText>
            </FieldContainer>
            <FieldContainer>
               <InputField
                  error={
                     touched[password] &&
                     errorMessagesRefValues.current.password !== ""
                  }
               >
                  <legend>password</legend>
                  <Input
                     type="password"
                     name={password}
                     autoComplete="new-password"
                     size="50"
                     placeholder="Enter your passwrod"
                     value={formValues.password}
                     onChange={handleInputChange}
                  />
               </InputField>
               <FieldErrorText>
                  {touched[password] && errorMessagesRefValues.current.password}
               </FieldErrorText>
            </FieldContainer>
            <ThisButton
               type="submit"
               disabled={disableSendButton}
               onClick={performOk}
            >
               {isSignUp ? "SIGN UP" : "LOG IN"}
            </ThisButton>
            <ThisButton type="submit" onClick={performCancel}>
               CANCEL
            </ThisButton>
         </FormContainer>
      </ContentContainer>
   );
};
