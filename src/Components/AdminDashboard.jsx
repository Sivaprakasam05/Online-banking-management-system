import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loans, setLoans] = useState([]);
  const [tab, setTab] = useState(0);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:8080/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Stats fetch failed:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8080/admin/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Users fetch failed:', err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch('http://localhost:8080/admin/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error('Transactions fetch failed:', err);
    }
  };

  const fetchLoans = async () => {
    try {
      const res = await fetch('http://localhost:8080/admin/loans');
      const data = await res.json();
      setLoans(data);
    } catch (err) {
      console.error('Loans fetch failed:', err);
    }
  };

  const updateLoanStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:8080/admin/loan/${id}/status?status=${status}`, {
        method: 'PUT',
      });
      if (res.ok) {
        fetchLoans();
      } else {
        console.error('Failed to update loan status');
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const handleTabChange = (e, newValue) => setTab(newValue);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchTransactions();
    fetchLoans();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">
            Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box p={3}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          sx={{
            mb: 3,
            '& .MuiTab-root': { fontWeight: 'bold', textTransform: 'none', fontSize: 16 },
            '& .Mui-selected': { color: '#1976d2' },
            '& .MuiTabs-indicator': { backgroundColor: '#1976d2', height: 3 },
          }}
        >
          <Tab label="Stats" />
          <Tab label="Users" />
          <Tab label="Transactions" />
          <Tab label="Loans" />
        </Tabs>

        {tab === 0 && (
          <Grid
            container
            spacing={3}
            mt={1}
            justifyContent="center"
            alignItems="center"
            minHeight="20vh"
          >
            {[
              { title: 'Total Users', value: stats.totalUsers || 0, color: '#4caf50' },
              { title: 'Total Transactions', value: stats.totalTransactions || 0, color: '#2196f3' },
              { title: 'Total Loans', value: stats.totalLoans || 0, color: '#ff9800' },
            ].map((stat, i) => (
              <Grid item xs={12} sm={4} md={3} key={i}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 3,
                    backgroundColor: stat.color,
                    color: '#fff',
                    boxShadow: 4,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.03)' },
                  }}
                >
                  <Typography variant="h6">{stat.title}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {tab === 1 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              All Users
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ borderRadius: 3, boxShadow: 3, overflow: 'hidden' }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: '#1976d2' }}>
                  <TableRow>
                    {['ID', 'Username', 'AccountNumber', 'Email'].map((head) => (
                      <TableCell key={head} sx={{ color: '#fff', fontWeight: 'bold' }}>
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.accountNumber}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tab === 2 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              All Transactions
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ borderRadius: 3, boxShadow: 3, overflow: 'hidden' }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: '#1976d2' }}>
                  <TableRow>
                    {['ID', 'Sender', 'Receiver', 'Amount', 'Date'].map((head) => (
                      <TableCell key={head} sx={{ color: '#fff', fontWeight: 'bold' }}>
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id} hover>
                      <TableCell>{tx.id}</TableCell>
                      <TableCell>{tx.fromAccount}</TableCell>
                      <TableCell>{tx.toAccount}</TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>{tx.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tab === 3 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              All Loans
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ borderRadius: 3, boxShadow: 3, overflow: 'hidden' }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: '#1976d2' }}>
                  <TableRow>
                    {['ID', 'User Name', 'Account', 'Loan Type', 'Amount', 'Duration', 'Status', 'Change Status'].map(
                      (head) => (
                        <TableCell key={head} sx={{ color: '#fff', fontWeight: 'bold' }}>
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loans.map((loan) => (
                    <TableRow key={loan.id} hover>
                      <TableCell>{loan.id}</TableCell>
                      <TableCell>{loan.fullName}</TableCell>
                      <TableCell>{loan.accountNumber}</TableCell>
                      <TableCell>{loan.loanType}</TableCell>
                      <TableCell>{loan.amountRequested}</TableCell>
                      <TableCell>{loan.durationMonths} months</TableCell>
                      <TableCell>{loan.status}</TableCell>
                      <TableCell>
                        <TextField
                          select
                          size="small"
                          defaultValue={loan.status}
                          onChange={(e) => updateLoanStatus(loan.id, e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': { borderRadius: 2 },
                          }}
                        >
                          <MenuItem value="PENDING">PENDING</MenuItem>
                          <MenuItem value="APPROVED">APPROVED</MenuItem>
                          <MenuItem value="REJECTED">REJECTED</MenuItem>
                        </TextField>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
