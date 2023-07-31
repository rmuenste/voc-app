import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ButtonFetch from './components/fetch-test/ButtonFetch';
import MyNavbar from './components/navbar-component/MyNavbar';
import QueryForm from './components/query-form/QueryForm';
import './App.css';
import LoginForm from './components/login-form/Login';
import RegisterForm from './components/register-form/Register';
import Welcome from './components/welcome/Welcome';
import { AuthProvider } from './AuthContext';
import ConfigureForm from './components/configure-form/Configure';
import TrainerForm from './components/trainer-form/Trainer';
import Result from './components/result/Result';
import Profile from './components/profile/Profile';

const App = () => {
  
  return (
    <AuthProvider>
      <MyNavbar/>
      <main>
      <Routes>
        <Route exact path="/" Component={LoginForm} />
        <Route exact path="/register" Component={RegisterForm} />
        <Route exact path="/query" Component={QueryForm} />
        <Route exact path="/welcome" Component={Welcome} />
        <Route exact path="/configure" Component={ConfigureForm} />
        <Route exact path="/trainer" Component={TrainerForm} />
        <Route exact path="/result" Component={Result} />
        <Route exact path="/profile" Component={Profile} />
      </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
