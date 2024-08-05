import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import NavBar from './components/NavBar/NavBar';
import Singin from './pages/SigninPage/SigninPage'
import Signup from './pages/SignupPage/SignupPage';
import ProtectedRoute from './utils/ProtectedRoute';
import Dashboard from './pages/DaskboardPage/DashboardPage';
import CreateTypeSaving from './pages/TypeSaving/TypeSaving';
import CreateTypeExpense from './pages/TypeExpense/TypeExpense';
import CreateIncome from './pages/Income/Income';
import CreateExpense from './pages/Expense/Expense';
import CreateSavingsTargets from './pages/TargetsSavings/TargetSavings';

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

          <Route element={
            <CreateTypeSaving />
          } path='/dashboard/create_type_saving' />

          <Route element={
            <CreateTypeExpense />
          } path='/dashboard/create_type_expense' />

          <Route element={
            <CreateIncome />
          } path='/dashboard/create_income' />

          <Route element={
            <CreateExpense />
          } path='/dashboard/create_expense' />

          <Route element={
            <CreateSavingsTargets />
          } path='/dashboard/create_saving_target' />
        </Routes>
      </Router>
    </>
  )
}

export default App
