import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, Pagination, IconButton 
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowDownward, ArrowUpward } from '@mui/icons-material';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentContact, setCurrentContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'asc' });
  const contactsPerPage = 5;

  useEffect(() => {
    fetchContacts();
  }, [page, sortConfig]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/contacts?page=${page}&limit=${contactsPerPage}`);
      const sortedContacts = sortContacts(response.data.contacts);
      setContacts(sortedContacts);
      setTotalPages(Math.ceil(response.data.total / contactsPerPage));
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const sortContacts = (contacts) => {
    const { key, direction } = sortConfig;
    const sorted = [...contacts].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  };

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentContact({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: ''
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/contacts/${currentContact._id}`, currentContact);
      } else {
        await axios.post('http://localhost:5000/api/contacts', currentContact);
      }
      fetchContacts();
      handleClose();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleEdit = (contact) => {
    setCurrentContact(contact);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle sorting logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';  // Toggle to descending if already ascending
    }
    setSortConfig({ key, direction });  // Update sort config
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Contact Management System</h1>
      </header>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpen}
        style={{ marginBottom: '2rem' }}
      >
        Add New Contact
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="form-grid">
            <TextField
              name="firstName"
              label="First Name"
              value={currentContact.firstName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={currentContact.lastName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={currentContact.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="phone"
              label="Phone Number"
              value={currentContact.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="company"
              label="Company"
              value={currentContact.company}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="jobTitle"
              label="Job Title"
              value={currentContact.jobTitle}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} className="contacts-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('firstName')}>
                First Name 
                {sortConfig.key === 'firstName' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </TableCell>
              <TableCell onClick={() => handleSort('lastName')}>
                Last Name
                {sortConfig.key === 'lastName' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </TableCell>
              <TableCell onClick={() => handleSort('email')}>
                Email
                {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </TableCell>
              <TableCell onClick={() => handleSort('phone')}>
                Phone
                {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </TableCell>
              <TableCell onClick={() => handleSort('company')}>
                Company
                {sortConfig.key === 'company' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </TableCell>
              <TableCell onClick={() => handleSort('jobTitle')}>
                Job Title
                {sortConfig.key === 'jobTitle' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <div className="action-buttons">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(contact)}
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(contact._id)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
}

export default App;
