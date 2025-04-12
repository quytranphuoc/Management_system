import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
  Avatar,
  Checkbox,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export interface IUser {
  username: string;
  email: string;
  mobile: string;
  password?: string;
  userType?: "admin" | "user";
  name?: string;
}

const ListUserScreen = () => {
  const sampleUsers: IUser[] = Array.from({ length: 50 }, (_, index) => ({
    username: `User${index + 1}`,
    email: `user${index + 1}@example.com`,
    mobile: `123-456-789${index % 10}`,
    userType: index % 2 === 0 ? "admin" : "user",
  }));

  const [users] = useState<IUser[]>(sampleUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

      <TableContainer
        component={Paper}
        className="shadow-sm rounded-xl"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell className="text-gray-700 font-bold">Username</TableCell>
              <TableCell className="text-gray-700 font-bold">Email</TableCell>
              <TableCell className="text-gray-700 font-bold">Mobile</TableCell>
              <TableCell className="text-gray-700 font-bold">User Type</TableCell>
              <TableCell className="text-gray-700 font-bold text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 transition"
                >
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        sx={{ width: 44, height: 44 }}
                        src={`https://i.pravatar.cc/300?u=${user.username}`}
                      />
                      <span className="text-gray-800 font-medium">{user.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell className="text-gray-600">{user.mobile}</TableCell>
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
