import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ButtonFetch from './components/fetch-test/ButtonFetch';
import MyNavbar from './components/navbar-component/MyNavbar';
import QueryForm from './components/query-form/QueryForm';
import './App.css';
import LoginForm from './components/login-form/Login';

const App = () => {
  
  return (
    <>
      <MyNavbar/>
      <main>
      <Routes>
        <Route exact path="/" Component={LoginForm} />
        <Route exact path="/query" Component={QueryForm} />
      </Routes>
      </main>
    </>
  );
}

export default App;
