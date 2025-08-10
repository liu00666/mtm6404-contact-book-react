import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './ContactDetail.css';

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      const contactRef = doc(db, 'contacts', id);
      const contactSnap = await getDoc(contactRef);
      
      if (contactSnap.exists()) {
        setContact({ id: contactSnap.id, ...contactSnap.data() });
      } else {
        navigate('/');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contact:', error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setDeleting(true);
      try {
        await deleteDoc(doc(db, 'contacts', id));
        navigate('/');
      } catch (error) {
        console.error('Error deleting contact:', error);
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading contact...</div>;
  }

  if (!contact) {
    return <div className="error">Contact not found</div>;
  }

  return (
    <div className="contact-detail">
      <div className="contact-detail-header">
        <Link to="/" className="back-btn">← Back to Contacts</Link>
        <div className="contact-actions">
          <Link to={`/edit/${id}`} className="edit-btn">Edit</Link>
          <button 
            onClick={handleDelete} 
            className="delete-btn"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="contact-detail-content">
        <div className="contact-avatar-large">
          {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
        </div>
        
        <h1>{contact.firstName} {contact.lastName}</h1>
        
        <div className="contact-info-grid">
          <div className="info-item">
            <label>Email:</label>
            <span>{contact.email}</span>
          </div>
          
          {contact.phone && (
            <div className="info-item">
              <label>Phone:</label>
              <span>{contact.phone}</span>
            </div>
          )}
          
          {contact.company && (
            <div className="info-item">
              <label>Company:</label>
              <span>{contact.company}</span>
            </div>
          )}
          
          {contact.address && (
            <div className="info-item">
              <label>Address:</label>
              <span>{contact.address}</span>
            </div>
          )}
          
          {contact.notes && (
            <div className="info-item">
              <label>Notes:</label>
              <span>{contact.notes}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetail; 