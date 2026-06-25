import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout'
import Login from './components/Login';
import CompaniesIndex from './pages/companies/Index'
import PeopleIndex from './pages/people/Index'
import CompanyDetails from './pages/companies/Details'
import PersonDetails from './pages/people/Details'


function App() {
  const [accessToken, setAccessToken] = useState(null);

  if (!accessToken) {
    return <Login setAccessToken={setAccessToken} />
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout setAccessToken={setAccessToken}/>}>
            <Route index element={<CompaniesIndex />} />
            <Route path="companies" element={<CompaniesIndex />} />
            <Route path="company/edit/:id" element={<CompaniesIndex />} />
            <Route path="company/show/:id" element={<CompaniesIndex />} />
            <Route path="company/create" element={<CompaniesIndex />} />
            <Route path="company/details/:id" element={<CompanyDetails />} />
            <Route path="company_person/create/:company_id" element={<CompanyDetails />} />
            <Route path="people" element={<PeopleIndex />} />
            <Route path="person/create" element={<PeopleIndex />} />
            <Route path="person/show/:id" element={<PeopleIndex />} />
            <Route path="person/edit/:id" element={<PeopleIndex />} />
            <Route path="person/details/:id" element={<PersonDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

