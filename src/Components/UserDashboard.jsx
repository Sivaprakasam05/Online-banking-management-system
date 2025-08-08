import React, { useState, useEffect, useMemo } from 'react';
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box,
  CssBaseline, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Snackbar, Alert, Grid
} from '@mui/material';
import './UserDashboard.css';

const drawerWidth = 240;

export default function UserDashboard() {
  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const [transactions, setTransactions] = useState([]);
  const [loanList, setLoanList] = useState([]);
  const [userProfile, setUserProfile] = useState({ username: '', accountNumber: '', balance: 0 });
  const [openDialog, setOpenDialog] = useState({ transfer: false, bill: false, loan: false });
  const [formData, setFormData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const userId = useMemo(() => localStorage.getItem('userId'), []);
  const accountNumber = useMemo(() => localStorage.getItem('accountNumber'), []);

  const handleDrawerItemClick = (section) => setSelectedSection(section);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('accountNumber');
    window.location.href = '/login';
  };

  const showSnackbar = (message, severity = 'success') => {
    if (severity === 'success') {
      message = `✅ ${message}`;
    }
    setSnackbar({ open: true, message, severity });
  };


  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchTransactions = async () => {
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:8080/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch {
      showSnackbar('Failed to load transactions', 'error');
    }
  };

  const fetchLoanStatus = async () => {
    const accNum = userProfile.accountNumber;
    if (!accNum) {
      showSnackbar("Account number not available. Apply for a loan first.", "warning");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/loan/status/${accNum}`);
      const data = await response.json();
      setLoanList(data);
    } catch {
      showSnackbar('Failed to fetch loan status', 'error');
    }
  };

  const fetchUserProfile = async () => {
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:8080/profile/${userId}`);
      const data = await response.json();
      setUserProfile({
        username: data.username,
        accountNumber: data.accountNumber,
        balance: data.balance
      });
      localStorage.setItem('accountNumber', data.accountNumber);
    } catch {
      showSnackbar('Failed to load user profile', 'error');
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchUserProfile();
  }, []);

  const handleSubmit = async (type) => {
    if (!userId) {
      showSnackbar('User session expired. Please login again.', 'error');
      return;
    }

    try {
      let url = '';
      let bodyData = { ...formData, userId };

      if (type === 'transfer') {
        url = 'http://localhost:8080/transfer';
        bodyData.amount = parseFloat(formData.amount || 0);
        bodyData.fromAccount = userProfile.accountNumber;
      } else if (type === 'bill') {
        url = 'http://localhost:8080/pay-bill';
        bodyData.amount = parseFloat(formData.amount || 0);
      } else if (type === 'loan') {
        url = 'http://localhost:8080/loan';
        bodyData.accountNumber = userProfile.accountNumber;
        bodyData.amountRequested = parseFloat(formData.amountRequested || 0);
        bodyData.annualIncome = parseFloat(formData.annualIncome || 0);

        if (!formData.loanType || !formData.durationMonths || !formData.amountRequested) {
          showSnackbar("Please fill all required fields", "warning");
          return;
        }
      }

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      };

      const response = await fetch(url, options);

      let result = {};
      try {
        result = await response.json();
      } catch {
        result = { message: "No response body" };
      }

      if (response.ok) {
        showSnackbar(
          `${type === 'loan' ? 'Loan Application' : type === 'bill' ? 'Bill Payment' : 'Money Transfer'} successful`
        );
        fetchTransactions();
        fetchUserProfile();
        setFormData({});
        setOpenDialog({ transfer: false, bill: false, loan: false });
      } else {
        showSnackbar(result.message || 'Something went wrong', 'error');
      }
    } catch (error) {
      console.error("Submit Error:", error);
      showSnackbar('An error occurred. Please try again.', 'error');
    }
  };

  return (
    <Box className="dashboard-container" sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" className="custom-appbar" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>User Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout} className="custom-btn">Logout</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className="custom-drawer"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1a237e', color: 'white' },
        }}
      >
        <Toolbar />
        <List>
          {['Dashboard', 'Transactions', 'Send Money', 'Pay Bills', 'Apply Loan', 'Loan Status', 'User Profile'].map((text) => (
            <ListItem button key={text} onClick={() => handleDrawerItemClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" className="main-content" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom className="main-heading">{selectedSection}</Typography>

        {selectedSection === 'Dashboard' && (
          <Typography>Welcome to your banking dashboard.</Typography>
        )}

        {selectedSection === 'Transactions' && (
          <Paper elevation={3} className="custom-card">
            <Typography variant="h6">Transaction History</Typography>
            {transactions.length > 0 ? (
              <ul className="transaction-list">
                {transactions.map((txn, idx) => (
                  <li key={idx}>
                    {txn.type === 'CREDIT' ? '+ ' : '- '}₹{txn.amount} - {txn.description} ({txn.date})
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No transactions found.</Typography>
            )}
          </Paper>
        )}

        {selectedSection === 'Send Money' && (
          <Button variant="contained" className="custom-btn" onClick={() => setOpenDialog({ ...openDialog, transfer: true })}>Send Money</Button>
        )}

        {selectedSection === 'Pay Bills' && (
          <Button variant="contained" className="custom-btn" onClick={() => setOpenDialog({ ...openDialog, bill: true })}>Pay Bill</Button>
        )}

        {selectedSection === 'Apply Loan' && (
          <Button variant="contained" className="custom-btn" onClick={() => setOpenDialog({ ...openDialog, loan: true })}>Apply for Loan</Button>
        )}

        {selectedSection === 'Loan Status' && (
          <Paper elevation={3} className="custom-card">
            <Typography variant="h6">Loan Applications</Typography>
            <Button variant="outlined" className="custom-btn" onClick={fetchLoanStatus} sx={{ mb: 2 }}>Refresh</Button>
            {loanList.length > 0 ? (
              <ul className="transaction-list">
                {loanList.map((loan, idx) => (
                  <li key={idx}>
                    <b>{loan.loanType}</b> - ₹{loan.amountRequested} - <b>Status:</b> {loan.status}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No loan applications found.</Typography>
            )}
          </Paper>
        )}

        {selectedSection === 'User Profile' && (
          <Paper elevation={3} className="custom-card">
            <Typography variant="h6">User Profile</Typography>
            <Typography><b>Name:</b> {userProfile.username}</Typography>
            <Typography><b>Account Number:</b> {userProfile.accountNumber}</Typography>
            <Typography><b>Balance:</b> ₹{userProfile.balance}</Typography>
          </Paper>
        )}

        <Dialog open={openDialog.transfer} onClose={() => setOpenDialog({ ...openDialog, transfer: false })}>
          <DialogTitle>Send Money</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="From Account"
              value={userProfile.accountNumber}
              disabled
            />
            <TextField
              fullWidth
              margin="dense"
              label="To Account"
              name="toAccount"
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Recipient Name"
              name="recipientName"
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Amount"
              name="amount"
              type="number"
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              name="description"
              onChange={handleFormChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog({ ...openDialog, transfer: false })}>Cancel</Button>
            <Button onClick={() => handleSubmit('transfer')}>Send</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog.bill} onClose={() => setOpenDialog({ ...openDialog, bill: false })}>
          <DialogTitle>Pay Bill</DialogTitle>
          <DialogContent>
            <TextField fullWidth margin="dense" label="Account Number" name="accountNumber" onChange={handleFormChange} />
            <TextField fullWidth margin="dense" label="Biller Name" name="billerName" onChange={handleFormChange} />
            <TextField fullWidth margin="dense" label="Bill Type" name="billType" onChange={handleFormChange} />
            <TextField fullWidth margin="dense" label="Amount" name="amount" type="number" onChange={handleFormChange} />
            <TextField fullWidth margin="dense" label="Due Date (YYYY-MM-DD)" name="dueDate" onChange={handleFormChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog({ ...openDialog, bill: false })}>Cancel</Button>
            <Button onClick={() => handleSubmit('bill')}>Pay</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog.loan} onClose={() => setOpenDialog({ ...openDialog, loan: false })}>
          <DialogTitle>Apply for Loan</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField fullWidth label="Full Name" name="fullName" onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Account Number" value={userProfile.accountNumber} disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Loan Type" name="loanType" onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Amount Requested" name="amountRequested" type="number" onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Duration (Months)" name="durationMonths" type="number" onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Annual Income" name="annualIncome" type="number" onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Employment Status" name="employmentStatus" onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Purpose" name="purpose" onChange={handleFormChange} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog({ ...openDialog, loan: false })}>Cancel</Button>
            <Button onClick={() => handleSubmit('loan')}>Apply</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{
              backgroundColor:
                snackbar.severity === 'success'
                  ? '#4caf50' 
                  : snackbar.severity === 'error'
                    ? '#f44336' 
                    : snackbar.severity === 'warning'
                      ? '#ff9800' 
                      : '#2196f3', 
              color: '#fff', 
              fontWeight: 'bold',
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
