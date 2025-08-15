import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContacts } from '../db';
import { populateDatabase } from '../populateDb';
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [populating, setPopulating] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const contactsData = await getContacts();
      setContacts(contactsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  const handlePopulateDatabase = async () => {
    setPopulating(true);
    console.log('Starting to populate database...');
    try {
      await populateDatabase();
      console.log('Database populated, now refreshing contacts...');
      // Refresh the contacts list after populating
      await fetchContacts();
      console.log('Contacts refreshed successfully');
      alert('Database populated successfully with sample contacts!');
    } catch (error) {
      console.error('Error populating database:', error);
      alert('Error populating database. Check console for details.');
    } finally {
      setPopulating(false);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading contacts...</div>;
  }

  return (
    <div className="contact-list">
      <div className="contact-list-header">
        <h2>All Contacts</h2>
        <div className="header-buttons">
          <button 
            onClick={handlePopulateDatabase} 
            className="populate-btn"
            style={{ marginRight: '10px' }}
            disabled={populating}
          >
            {populating ? 'Populating...' : 'Populate DB'}
          </button>
          <Link to="/add" className="add-contact-btn">Add New Contact</Link>
        </div>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by first or last name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredContacts.length === 0 ? (
        <div className="no-contacts">
          {searchTerm ? 'No contacts found matching your search.' : 'No contacts found.'}
        </div>
      ) : (
        <div className="contacts-grid">
          {filteredContacts.map(contact => (
            <Link 
              key={contact.id} 
              to={`/contact/${contact.id}`}
              className="contact-card"
            >
              <div className="contact-avatar">
                {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
              </div>
              <div className="contact-info">
                <h3>{contact.firstName} {contact.lastName}</h3>
                <p>{contact.email}</p>
                {contact.phone && <p>{contact.phone}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList; 