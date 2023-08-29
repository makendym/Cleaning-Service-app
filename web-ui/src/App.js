
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Hello from "./components/Hello";
import BookingForm from "./components/BookingForm";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./layout/Footer";
const client = new ApolloClient({
  uri: "/.netlify/functions/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="/bookingform" element={<BookingForm />} />        
          </Routes>
        <Footer/>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
