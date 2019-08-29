import React from 'react'
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ME_QUERY = gql`
  query ME_QUERY {
    me {      
      email
    }
  }
`;

const Me = (props) => {
  const { loading, data, error } = useQuery(ME_QUERY);
  if (loading) return <p>loading</p>
  if (error) return <p>error</p>

  if (data) {    
    return (props.children(data) )
  }
}

export default Me;
export { ME_QUERY };
