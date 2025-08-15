import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';

// Collection reference
const contactsCollection = collection(db, 'contacts');

// Add a new contact
export const addContact = async (contactData) => {
  try {
    const docRef = await addDoc(contactsCollection, {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      createdAt: new Date()
    });
    return docRef;
  } catch (error) {
    console.error('Error adding contact: ', error);
    throw error;
  }
};

// Get all contacts
export const getContacts = async () => {
  try {
    const q = query(contactsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const contacts = [];
    querySnapshot.forEach((doc) => {
      contacts.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return contacts;
  } catch (error) {
    console.error('Error getting contacts: ', error);
    throw error;
  }
};

// Update a contact
export const updateContact = async (id, contactData) => {
  try {
    const contactRef = doc(db, 'contacts', id);
    await updateDoc(contactRef, {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating contact: ', error);
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  try {
    const contactRef = doc(db, 'contacts', id);
    await deleteDoc(contactRef);
  } catch (error) {
    console.error('Error deleting contact: ', error);
    throw error;
  }
};

// Get a single contact by ID
export const getContact = async (id) => {
  try {
    const contactRef = doc(db, 'contacts', id);
    const contactDoc = await getDoc(contactRef);
    if (contactDoc.exists()) {
      return {
        id: contactDoc.id,
        ...contactDoc.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting contact: ', error);
    throw error;
  }
}; 