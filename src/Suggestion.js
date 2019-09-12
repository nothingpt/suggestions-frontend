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
  const [estado, updateEstado] = useState("");

  const { id } = props.match.params;

  const { loading, error, data, onCompleted } = useQuery(
    SINGLE_SUGGESTION_QUERY,
    {
      variables: {
        id
      }
    }
  );
  const [updateSuggestion, { errorM, loadingM }] = useMutation(
    UPDATE_SUGGESTION_MUTATION
  );
  const { suggestion } = data;

  if (error || errorM) return <p>...ERROR...</p>;
  if (loading || loadingM) return <p>...LOADING</p>;

  const submitForm = e => {
    console.log(`ESTADO: ${estado}`)
    e.preventDefault();
    if ( estado != '' ) {
      updateSuggestion({
        variables: {
          id: suggestion.id,
          visible: true,
          status: estado
        }
      });
    }
    updateEstado("");
  };

  const handleEstado = (val) => {
    // e.preventDefault();
    var that = this;
    console.log('caller: ', that)
    updateEstado(val);
  }

  return (
    <Me>
      {data => (
        <div className="content">
      <div className="container-content">
        <div className="suggestion-wrapper">
              <form onSubmit={submitForm}>
              <div className='suggestion-title'>
                <h1>{suggestion.title }</h1>
              </div>
              <div className='suggestion-content'>
                <textarea readOnly value={suggestion.suggestion} />
              </div>
              <div className='suggestion-decision'>
              <div className='suggestion-refused'>
                <span className='btn-nok' onClick = { () => handleEstado('NOT_APPROVED')}>Not Approved</span>
              </div>
              <div className='suggestion-approved'>
                <span className='btn-ok' onClick = { () => handleEstado('APPROVED') }>Approved</span>
              </div>
              </div>
              <div className='suggestion-submit'>
                <button type="submit" disabled={estado===''} className={ estado !== '' ? 'btn-submit' : 'btn-disabled'}>Confirm</button>
              </div>
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
