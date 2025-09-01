import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginApp from './components/login.jsx'
import HomeApp from './components/Home.jsx'
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<HomeApp/>}/>
      <Route path="/login" element={<LoginApp/>}/>
    </Routes>
  </BrowserRouter>
)
