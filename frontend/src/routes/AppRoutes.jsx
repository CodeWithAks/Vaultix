import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Cards from "../pages/Cards";
import Transfers from "../pages/Transfers";
import Insights from "../pages/Insights";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/insights" element={<Insights />} />
        </Routes>
    </BrowserRouter>
  )
}