// 1. list all suggestions
// 2. add option to change status

import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const SUGGESTIONS = gql`
  query SUGGESTIONS($all: Boolean) {
    suggestions(all: $all) {
      id
      title
      suggestion
      visible
      status
    }
  }
`;

const Admin = ( props ) => {
  const { data, error, loading } = useQuery(SUGGESTIONS, {
    variables: {
      all: true
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { suggestions } = data;

  return (
    <div className="content">
      <div className="container-content">
        <div className="content-textarea">
          <ul>
            {suggestions.map(({ id, title, status }) => {
              return (
                <li key={id} title="test">
                  [{`${status}`}] {title} -{" "}
                  <Link to={`/suggestion/${id}`}>See</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
