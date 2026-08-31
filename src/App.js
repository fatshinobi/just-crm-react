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
import Dashboards from "./pages/Dashboards";
import OpportunitiesIndex from "./pages/opportunities/Index";
import OpportunityShow from "./components/opportunities/Show";
import OpportunityCreate from "./components/opportunities/Create";
import OpportunityEdit from "./components/opportunities/Edit";
import OpportunityDetails from "./pages/opportunities/Details";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  if (!accessToken) {
    return <Login setAccessToken={setAccessToken} />
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout setAccessToken={setAccessToken}/>}>
            <Route index element={<Dashboards />} />
            <Route path="companies/tags/:tag" element={<CompaniesIndex />} />
            <Route path="companies/search/:query" element={<CompaniesIndex />} />
            <Route path="companies/appointment/create" element={<CompaniesIndex />} />
            <Route path="companies" element={<CompaniesIndex />} />
            <Route path="company/edit/:id" element={<CompaniesIndex />} />
            <Route path="company/show/:id" element={<CompaniesIndex />} />
            <Route path="company/create" element={<CompaniesIndex />} />
            <Route path="company/details/:id" element={<CompanyDetails />} />
            <Route path="company/appointments/create/:id" element={<CompanyDetails />} />
            <Route path="company/appointments/edit/:id/:appointment_id" element={<CompanyDetails />} />
            <Route path="company_person/create/:id" element={<CompanyDetails />} />
            <Route path="company_person/edit/:person_id/:id" element={<CompanyDetails />} />
            <Route path="company/tags/:id" element={<CompanyDetails />} />
            <Route path="people/tags/:tag" element={<PeopleIndex />} />
            <Route path="people/search/:query" element={<PeopleIndex />} />
            <Route path="people/appointment/create" element={<PeopleIndex />} />
            <Route path="people" element={<PeopleIndex />} />
            <Route path="person/create" element={<PeopleIndex />} />
            <Route path="person/show/:id" element={<PeopleIndex />} />
            <Route path="person/edit/:id" element={<PeopleIndex />} />
            <Route path="person/details/:id" element={<PersonDetails />} />
            <Route path="person_company/create/:id" element={<PersonDetails />} />
            <Route path="person_company/edit/:company_id/:id" element={<PersonDetails />} />
            <Route path="person/tags/:id" element={<PersonDetails />} />
            <Route path="person/opportunities/create/:id" element={<PersonDetails />} />
            <Route path="person/opportunities/edit/:opportunity_id/:id" element={<PersonDetails />} />
            <Route path="dashboard/appointments/show/:appointment_id" element={<Dashboards />} />
            <Route path="dashboard/appointments/edit/:appointment_id" element={<Dashboards />} />
            <Route path="dashboard/appointments/create" element={<Dashboards />} />
            <Route path="person/appointments/create/:id" element={<PersonDetails />} />
            <Route path="person/appointments/edit/:appointment_id/:id" element={<PersonDetails />} />
            <Route path="opportunities/search/:query" element={<OpportunitiesIndex />} />
            <Route path="opportunities/tags/:tag" element={<OpportunitiesIndex />} />
            <Route path="opportunities" element={<OpportunitiesIndex />} />
            <Route path="opportunity/show/:id" element={<OpportunitiesIndex />} />
            <Route path="opportunity/details/:id" element={<OpportunityDetails />} />
            <Route path="opportunity/edit/:opportunity_id" element={<OpportunitiesIndex />} />
            <Route path="opportunities/create" element={<OpportunitiesIndex />} />
            <Route path="opportunity/appointments/create/:id" element={<OpportunityDetails />} />
            <Route path="opportunity/appointments/edit/:appointment_id/:id" element={<OpportunityDetails />} />
            <Route path="company/opportunities/create/:id" element={<CompanyDetails />} />
            <Route path="company/opportunities/edit/:opportunity_id/:id" element={<CompanyDetails />} />
            <Route path="opportunity/tags/:id" element={<OpportunityDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

