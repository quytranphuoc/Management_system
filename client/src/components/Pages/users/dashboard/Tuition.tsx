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

export default function Payment() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        p: 2,
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

        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Số tiền (ETH)"
            type="number"
            placeholder="0.01"
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

          {status === "success" && (
            <Alert severity="success" icon={<CheckCircleIcon />}>
              <AlertTitle>Giao dịch thành công!</AlertTitle>
              <Link target="_blank" rel="noopener noreferrer" underline="hover">
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
            disabled={status === "loading"}
            sx={{
              bgcolor: "#f57c00",
              "&:hover": { bgcolor: "#ef6c00" },
              py: 1.5,
            }}
            endIcon={status === "loading" ? undefined : <ArrowForwardIcon />}
          >
            {status === "loading" ? (
              <>
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />{" "}
                Đang xử lý...
              </>
            ) : (
              "Thanh Toán Ngay"
            )}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
