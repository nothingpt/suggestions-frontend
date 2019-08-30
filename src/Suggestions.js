import React, { useState, useEffect, fetchMore } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Me from "./Me";

const SUGGESTIONS = gql`
  query SUGGESTIONS($all: Boolean, $offset: Int, $limit: Int) {
    suggestions(all: $all, offset: $offset, limit: $limit) {
      id
      title
      suggestion
      visible
      status
    }
  }
`;

const TOTAL_SUGGESTIONS = gql`
  query TOTAL_SUGGESTIONS {
    numberOfSuggestions
  }
`;

const Suggestions = props => {
  const [currPage, setCurrPage] = useState(0);
  const [maxPages, updateMaxPages] = useState(0);

  const {
    loading: lTotal,
    data: dTotal,
    error: eTotal,
    onCompleted
  } = useQuery(TOTAL_SUGGESTIONS);

  const { loading, data, error, refetch } = useQuery(SUGGESTIONS, {
    variables: {
      all: true,
      offset: currPage,
      limit: 10
    },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    const onCompleted = dTotal => {};

    if (dTotal && dTotal.numberOfSuggestions) {
      const totalNumberOfPages = Math.ceil(dTotal.numberOfSuggestions / 10);
      updateMaxPages(totalNumberOfPages);
    }
  }, [dTotal]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // refetch();

  const getNextPage = () => {
    setCurrPage(currPage + 1);
    refetch({ variables: { offset: currPage, limit: 10 } });
  };

  const getPrevPage = () => {
    setCurrPage(currPage - 1);
    refetch({ variables: { offset: currPage, limit: 10 } });
  };

  const { suggestions } = data;
  return (
    <Me>
      {data =>
        data.me && (
          <div className="content">
            <div className="container-content">
              <div className="suggestion-list-wrapper">
                <div>
                  <ul>
                    {suggestions.map(({ id, title, status }) => {
                      return (
                        <li key={id} className="list-suggestion">
                          <Link to={`/suggestion/${id}`}>{title}</Link> -{" "}
                          {status}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div class="pagination-container">
                  <div class="prev-button">
                    <button
                      onClick={() => {
                        getPrevPage();
                      }}
                    >
                      &lt;
                    </button>
                  </div>
                  <div class="current-page">
                    Page {currPage} of {maxPages}
                  </div>
                  <div class="next-button">
                    <button
                      onClick={() => {
                        getNextPage();
                      }}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </Me>
  );
};

export default Suggestions;
export { SUGGESTIONS };
