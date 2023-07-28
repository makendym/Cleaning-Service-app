import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Hello from "./components/Hello";
import Books from "./components/Books";
import Schedule from "./components/Schedule";
import AboutUs from "./components/AboutUs";
import BookingForm from "./components/BookingForm";
import CreateBook from "./components/CreateBook";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Example from "./layout/Example";
import Footer from "./layout/Footer";
import { Box } from '@mui/material';
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        {/* <Header /> */}
        <Example/>
        <Box sx={{ mt: 5, paddingRight:"10%", paddingLeft:"10%"}}>
          <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="/books" element={<Books />} />
            <Route path="/create" element={<CreateBook />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/bookingform" element={<BookingForm />} />
          
          </Routes>
        </Box>
        <Footer/>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
