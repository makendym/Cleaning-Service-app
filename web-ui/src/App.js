import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from "@apollo/client";
import Hello from "./components/Hello";
import BookingForm from "./components/BookingForm";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./layout/footer";
import Header from "./layout/header";

const client = new ApolloClient({
  //NetlifyGraphQL
  //"/.netlify/functions/graphql"
  //LocalGraphQL
  //"http://localhost:4000/graphql"
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
const TEST_QUERY = gql`
  {
    __typename
  }
`;

const TestComponent = () => {
  const { loading, error, data } = useQuery(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return <div>{data.__typename}</div>;
};
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Hello />}
          />
          <Route
            path="/bookingform"
            element={<BookingForm />}
          />
          <Route
            path="/test"
            element={<TestComponent />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
