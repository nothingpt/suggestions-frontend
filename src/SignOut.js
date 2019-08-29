import React from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { gql } from 'apollo-boost';
import { ME_QUERY } from './Me';

const SIGNOUT_MUTATION = gql`
mutation SIGNOUT_MUTATION {
  signout {
    message
  }
}
`;

const Signout = props => {
  const [signoutUser, { loading }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: ["ME_QUERY"]
  });

  return (
    <NavLink to="/login" activeClassName="nav-select">
      <button
        style={{
          backgroundColor: "Transparent",
          backgroundRepeat: "no-repeat",
          border: "none",
          cursor: "pointer",
          overflow: "hidden",
          outline: "none",
          color: 'white'
        }}
        onClick={ signoutUser }
      >
        Sign Out
      </button>
    </NavLink>
  );
};

export default Signout;
