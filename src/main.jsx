import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home.jsx';
import Movie from './pages/movie.jsx';
import Search from './pages/search.jsx';
import App from './App.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='movie/:id' element={<Movie/>} />
          <Route path='search' element={<Search/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
