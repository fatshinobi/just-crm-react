import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'
import Login from './components/Login';
import CompaniesIndex from './pages/companies/Index'
import React, {useState} from "react";

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
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
