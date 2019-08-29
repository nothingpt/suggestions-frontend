import React, { useState } from "react";
// import {Mutation} from 'react-apollo';
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ME_QUERY } from "./Me";

// query to login the user
// in the backend, if the login is successful, a token will be added to the cookies
const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`;

const Login = props => {
  // mutation hook to perform the mutation above
  // also executes the ME_QUERY again to update the logged in user
  const [loginUser, { loading }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: ["ME_QUERY"]
  });
  // hooks for the email and password field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // whenever the email input is changed, it updates the email var
  const changeEmail = e => {
    setEmail(e.target.value);
  };
  // whenever the password input is changed, it updates the password var
  const changePassword = e => {
    setPassword(e.target.value);
  };
  // handles the submission of the form
  // calls the mutation for the login
  const handleSubmit = async e => {
    e.preventDefault();
    if (email && password) {
      const res = await loginUser({
        variables: {
          email,
          password
        }
      });
      // clean the inputs
      setEmail("");
      setPassword("");
      if (res.data.login != null) {
        // redirects to the /see page where the logged in user can see all suggestions
        props.history.push("/see");
      }
    }
  };

  return (
    <div className='content'>
      <div className='loginFormContainer'>
      <form onSubmit={handleSubmit} className="loginForm">
        <fieldset className='loginFields'>
          <h2>Log In</h2>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={changeEmail}
            />
          </label>
          <br />
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={changePassword}
            />
          </label>
          <br />
          <button type="submit" className='loginButton'>Login</button>
        </fieldset>
      </form>
      </div>
    </div>
  );
};

export default Login;
