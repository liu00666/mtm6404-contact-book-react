import { addContact } from './db.js';

// Sample contacts data
const sampleContacts = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com"
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com"
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com"
  },
  {
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com"
  },
  {
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com"
  }
];

// Function to populate the database
export const populateDatabase = async () => {
  try {
    console.log('Starting to populate database...');
    
    for (const contact of sampleContacts) {
      await addContact(contact);
      console.log(`Added contact: ${contact.firstName} ${contact.lastName}`);
    }
    
    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

// If this file is run directly, populate the database
if (typeof window === 'undefined') {
  populateDatabase();
} 