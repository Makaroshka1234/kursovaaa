import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroPage from './pages/HeroPage';
import TasksPage from './pages/TasksPage';
import ComparisonPage from './pages/ComparisonPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
