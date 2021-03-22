import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://192.168.31.152:8081/graphql/",
  cache: new InMemoryCache()
});

const GET_POST_BY_ID = gql`
  query GetPost {
    post(id:1) {
      id
      text
      commentsCount
      commentSet {
        id
      }
    }
  }
`;

const ADD_POST = gql`
  mutation addPost($text: String!) {
    post(input:{user: "1", text: $text}) {
      id
      text
    }
  }
`;


function ExchangeRates() {
  const { loading, error, data } = useQuery(GET_POST_BY_ID);
  const [addPost, { addDataResponse }] = useMutation(ADD_POST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return <div>
      <p>{JSON.stringify(data)}</p>
      <button onClick={() => { addPost({ variables: { text: 'asdasd' } }); }}>ADD</button> 
    </div>
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <ExchangeRates />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
