import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  CircularProgress,
  Button,
} from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import axios from 'axios';
import { format } from 'date-fns';

interface Transaction {
  _id?: string;
  id?: number;
  amount: number;
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  status: string;
  timestamp: string;
}

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Fetching transactions with token:', token);
        
        if (!token) {
          console.error('No token found in localStorage');
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3000/api/transactions/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const mapped = response.data.map((tx: any) => ({
          ...tx,
          fromAddress: tx.from_address,
          toAddress: tx.to_address,
          transactionHash: tx.transaction_hash,
        }));
        console.log('Fetched transactions:', mapped);
        setTransactions(mapped);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        if (axios.isAxiosError(err)) {
          console.error('Error response:', err.response?.data);
          setError(err.response?.data?.message || 'Failed to fetch transactions');
        } else {
          setError('Failed to fetch transactions');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Lịch sử giao dịch
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Số tiền (ETH)</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Địa chỉ gửi</TableCell>
                  <TableCell>Địa chỉ nhận</TableCell>
                  <TableCell>Giao dịch</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx._id || tx.transactionHash}>
                    <TableCell>
                      {format(new Date(tx.timestamp), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>
                      <Typography
                        color={tx.status === 'completed' ? 'success.main' : 'error.main'}
                      >
                        {tx.status === 'completed' ? 'Thành công' : 'Thất bại'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={tx.fromAddress ? `https://sepolia.etherscan.io/address/${tx.fromAddress}` : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        {tx.fromAddress
                          ? `${tx.fromAddress.slice(0, 6)}...${tx.fromAddress.slice(-4)}`
                          : 'N/A'}
                        <OpenInNewIcon fontSize="small" />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={tx.toAddress ? `https://sepolia.etherscan.io/address/${tx.toAddress}` : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        {tx.toAddress
                          ? `${tx.toAddress.slice(0, 6)}...${tx.toAddress.slice(-4)}`
                          : 'N/A'}
                        <OpenInNewIcon fontSize="small" />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        href={`https://sepolia.etherscan.io/tx/${tx.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<OpenInNewIcon />}
                      >
                        Xem giao dịch
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {transactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Chưa có giao dịch nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionHistory; 