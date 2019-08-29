import React, { useState, useEffect } from "react";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Me from "./Me";

const SINGLE_SUGGESTION_QUERY = gql`
  query SINGLE_SUGGESTION_QUERY($id: ID!) {
    suggestion(id: $id) {
      id
      title
      suggestion
      status
      comment
      created_at
      updated_at
      visible
    }
  }
`;

const UPDATE_SUGGESTION_MUTATION = gql`
  mutation UPDATE_SUGGESTION_MUTATION(
    $id: ID!
    $status: StatusEnum
    $comment: String
    $updated_at: Date
    $visible: Boolean
    $closed: Boolean
  ) {
    updateSuggestion(
      id: $id
      status: $status
      comment: $comment
      updated_at: $updated_at
      visible: $visible
      closed: $closed
    ) {
      id
      status
      comment
      updated_at
      visible
      closed
    }
  }
`;

const Suggestion = props => {
  const [ estado, updateEstado ] = useState('');
  const [ comment, updateComment ] = useState('');

  const {
    id
  } = props.match.params;

  const { loading, error, data, onCompleted  } = useQuery(SINGLE_SUGGESTION_QUERY, {
    variables: {
      id
    }
  });
  const [ updateSuggestion, { errorM, loadingM}] = useMutation(UPDATE_SUGGESTION_MUTATION)
  const { suggestion } = data;

  useEffect(() => {
    const onCompleted = (data) => {};

    if (onCompleted) {
      if(data.suggestion && data.suggestion.status) {
        updateEstado(data.suggestion.status);
      }
    }
  }, [data]);

  function changeComment (e) {
    updateComment(e.target.value);
  }

  if (error || errorM) return <p>...ERROR...</p>;
  if (loading || loadingM) return <p>...LOADING</p>;


  const submitForm = (e) => {
    e.preventDefault();
    updateSuggestion({
      variables: {
        id: suggestion.id,
        visible: true,
        status: estado,
        comment
      }
    })

    updateEstado('');
    updateComment('');
  }

  return (
      <Me>
      {data => (
    <div className="content">
      <div className="container-content">
        <div className="content-textarea">
          <form onSubmit={submitForm}>
          <h1>{suggestion.title}</h1>
          <h5>{new Date(suggestion.created_at).toLocaleDateString()}</h5>
          <textarea readOnly value={suggestion.suggestion} />
            { estado === 'CONDITIONAL' ? 
              <textarea onChange={ changeComment } /> : ''
            }
          <select onChange={(e) => updateEstado(e.target.value)} disabled={!data.me} value={estado}>
            <option value=""></option>
            <option value="APPROVED">Approved</option>
            <option value="NOT_APPROVED">Not Approved</option>
            <option value="CONDITIONAL">Conditional</option>
          </select>
          <button type='submit' disabled={!data.me}>Confirm</button>
          </form>
        </div>
      </div>
    </div>
      )}
      </Me>
  );
};

export default Suggestion;
export { SINGLE_SUGGESTION_QUERY };
