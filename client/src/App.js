import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
import PostDetails from "./Components/PostDetails/PostDetails";
import { useEffect } from "react";

const App = () => {
  let user = JSON.parse(localStorage.getItem('profile'))
  const location = useLocation()
  useEffect(() => {
    user = JSON.parse(localStorage.getItem('profile'))
  }, [location])
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Navigate to="posts" />} />
        <Route path="/posts" exact element={<Home />} />
        <Route path="/posts/search" exact element={<Home />} />
        <Route path="/posts/:id" exact element={<PostDetails />} />
        <Route path="/auth" exact element={user ? <Navigate to="/" /> : <Auth />} />
      </Routes>
    </Container>
  );
};

export default App;
