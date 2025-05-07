import React, { useState, useEffect, useRef } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, Typography, Box, Avatar, Checkbox, IconButton, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password?: string;
  userType?: "admin" | "user";
}

const ListUserScreen = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch user list from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/list-users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sendDataToServer = async (data: IUser[]) => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/import-data-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Import failed");
      }

      const result = await response.json();
      alert("Import success: " + result.inserted?.length + " users");

      // Refresh list
      const refreshedUsers = await fetch("http://localhost:3000/api/admin/list-users");
      const refreshedData = await refreshedUsers.json();
      setUsers(refreshedData);
    } catch (error) {
      console.error("Error importing users:", error);
      alert("Failed to import users");
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (file.name.endsWith(".json")) {
          const json = JSON.parse(content as string);
          if (Array.isArray(json)) {
            sendDataToServer(json);
          }
        } else if (file.name.endsWith(".csv")) {
          const text = content as string;
          const lines = text.trim().split("\n");
          const headers = lines[0].split(",");
          const data = lines.slice(1).map((line) => {
            const values = line.split(",");
            const user: IUser = {
              name: values[headers.indexOf("name")],
              email: values[headers.indexOf("email")],
              phone: values[headers.indexOf("phone")],
              userType: values[headers.indexOf("userType")] as "admin" | "user",
            };
            return user;
          });
          sendDataToServer(data);
        }
      } catch (error) {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        User Management
      </Typography>

      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <input
          type="file"
          accept=".csv, .json"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileImport}
        />
        <Button
          variant="contained"
          startIcon={<UploadFileIcon />}
          onClick={() => fileInputRef.current?.click()}
        >
          Import data student
        </Button>
      </Box>

      <TableContainer component={Paper} className="shadow-sm rounded-xl">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell padding="checkbox" />
              <TableCell className="text-gray-700 font-bold">Username</TableCell>
              <TableCell className="text-gray-700 font-bold">Email</TableCell>
              <TableCell className="text-gray-700 font-bold">Phone</TableCell>
              <TableCell className="text-gray-700 font-bold">User Type</TableCell>
              <TableCell className="text-gray-700 font-bold text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={index} className="hover:bg-gray-50 transition">
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        sx={{ width: 44, height: 44 }}
                        src={`https://i.pravatar.cc/300?u=${user.name}`}
                      />
                      <span className="text-gray-800 font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell className="text-gray-600">{user.phone}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-semibold ${
                        user.userType === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.userType}
                    </span>
                  </TableCell>
                  <TableCell>
                    <IconButton color="error" size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default ListUserScreen;
