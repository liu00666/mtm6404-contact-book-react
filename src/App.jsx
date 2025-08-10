import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import ContactForm from './components/ContactForm';
import EditContact from './components/EditContact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Contact Book</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/contact/:id" element={<ContactDetail />} />
            <Route path="/add" element={<ContactForm />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
