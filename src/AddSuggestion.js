import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const ADD_SUGESTION_MUTATION = gql`
  mutation ADD_SUGGESTION_MUTATION($title: String!, $suggestion: String!) {
    addSuggestion(input: { title: $title, suggestion: $suggestion }){
     title
    }
  }
`;

const AddSuggestion = props => {
  const [addSuggestion, { loading }] = useMutation(ADD_SUGESTION_MUTATION);

  const [suggestion, setSuggestion] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="content">
      <div className="container-content">
        <div className="add-suggestion-wrapper">
          <form
            className="add-suggestion-form"
            onSubmit={async e => {
              e.preventDefault();

              if (title && suggestion) {
                const res = await addSuggestion({
                  variables: {
                    title: title,
                    suggestion: suggestion
                  }
                });
                setSuggestion("");
                setTitle("");
                props.history.push("/see");
              }
            }}
          >
            <input
              className="add-suggestion-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Insert title of suggestion"
            />
            <textarea
              className="add-suggestion-textArea"
              name={suggestion}
              value={suggestion}
              onChange={e => setSuggestion(e.target.value)}
              placeholder="Insert your suggestion"
            />
            <button
              type="submit"
              disabled={loading}
              className="add-suggestion-submit"
            >
              Submit Suggestion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSuggestion;
