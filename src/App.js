import React, { useState } from 'react';
import ButtonFetch from './components/fetch-test/ButtonFetch';
import MyNavbar from './components/navbar-component/MyNavbar';
import QueryForm from './components/query-form/QueryForm';
import './App.css';

const App = () => {
  
  return (
    <>
      <MyNavbar/>
      <ButtonFetch/>
      <QueryForm/>
    </>
  );
}

export default App;
