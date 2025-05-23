/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Alert,
  AlertTitle,
  Paper,
  CircularProgress,
  Link,
} from "@mui/material";
import {
  AccountBalanceWallet as WalletIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import axios from "axios";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Payment() {
  const [ethAmount, setEthAmount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Vui lòng cài đặt MetaMask");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      toast.success("Đã kết nối MetaMask!");
    } catch (err) {
      console.error(err);
      toast.error("Kết nối ví thất bại!");
    }
  };

  const saveTransaction = async (txHash: string) => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Token from localStorage:', token);
      console.log('Transaction data:', {
        amount: parseFloat(ethAmount),
        transactionHash: txHash,
        fromAddress: walletAddress,
        toAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
      });

      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/transactions', {
        amount: parseFloat(ethAmount),
        transactionHash: txHash,
        fromAddress: walletAddress,
        toAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Transaction saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving transaction:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        console.error('Error headers:', error.response?.headers);
      }
    }
  };

  const handlePayment = async () => {
    if (!walletAddress) {
      toast.warning("Vui lòng kết nối MetaMask trước");
      return;
    }

    try {
      setStatus("loading");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        value: ethers.parseEther(ethAmount),
      });

      await tx.wait();
      setTransactionHash(tx.hash);
      await saveTransaction(tx.hash);
      setStatus("success");
      toast.success("Giao dịch thành công!");
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.error("Giao dịch thất bại!");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      {/* Nút Connect ở góc phải trên cùng */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        {walletAddress ? (
          <Typography variant="body2" fontWeight="bold">
            Đã kết nối: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </Typography>
        ) : (
          <Button variant="outlined" onClick={handleConnectWallet}>
            Kết nối ví
          </Button>
        )}
      </Box>

      {/* Khung thanh toán */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          pt: 8, // đẩy xuống để không đè nút
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 450, boxShadow: 3 }}>
          <CardHeader
            title={
              <Typography variant="h5" align="center" fontWeight="bold">
                Thanh Toán
              </Typography>
            }
            subheader={
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
              >
                Nhập số tiền và nhấn thanh toán để tiếp tục
              </Typography>
            }
          />

          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Số tiền (ETH)"
              type="number"
              placeholder="0.01"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              fullWidth
              variant="outlined"
            />

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: "#fff8e1",
                borderColor: "#ffe57f",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <WalletIcon color="warning" />
              <Typography variant="body2">
                Thanh toán sẽ được thực hiện qua ví Metamask của bạn
              </Typography>
            </Paper>

            {status === "success" && transactionHash && (
              <Alert severity="success" icon={<CheckCircleIcon />}>
                <AlertTitle>Giao dịch thành công!</AlertTitle>
                <Link
                  href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  Xem giao dịch trên Etherscan
                </Link>
              </Alert>
            )}

            {status === "error" && (
              <Alert severity="error" icon={<ErrorIcon />}>
                <AlertTitle>Giao dịch thất bại</AlertTitle>
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={!walletAddress || status === "loading"}
              sx={{
                bgcolor: "#f57c00",
                "&:hover": { bgcolor: "#ef6c00" },
                py: 1.5,
              }}
              onClick={handlePayment}
              endIcon={status === "loading" ? undefined : <ArrowForwardIcon />}
            >
              {status === "loading" ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Đang xử lý...
                </>
              ) : (
                "Thanh Toán Ngay"
              )}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
