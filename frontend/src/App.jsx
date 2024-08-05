import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import NavBar from './components/NavBar/NavBar';
import Singin from './pages/SigninPage/SigninPage'
import Signup from './pages/SignupPage/SignupPage';
import ProtectedRoute from './utils/ProtectedRoute';
import Dashboard from './pages/DaskboardPage/DashboardPage';

function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route element={
            <ProtectedRoute>
              <Singin />
            </ProtectedRoute>
          } path='/' exact />

          <Route element={
            <ProtectedRoute>
              <Signup />
            </ProtectedRoute>
          } path='/signup' />

          <Route element={
            <Dashboard />
          } path='/dashboard' />
        </Routes>
      </Router>
    </>
  )
}

export default App
