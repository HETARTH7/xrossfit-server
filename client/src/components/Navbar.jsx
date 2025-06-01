import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useState } from "react";
import { AccountCircleOutlined } from "@mui/icons-material";
import { useLogout } from "@/utils/useLogout";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/utils/useAuthContext";
import {
  Input,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Popper,
} from "@mui/material";
import { ToastError } from "@/utils/toast-error";
import { ToastContainer } from "react-toastify";
import axios from "@/api/axios";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutBtnClick = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/user/search", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.data;
        setUsers(json);
      } catch (error) {
        ToastError(error);
      }
    };
    if (user) getUsers();
  }, [user]);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchAnchorEl(e.currentTarget);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar sx={{ padding: 0 }}>
        <ToastContainer />
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link
                href="/home"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link
                href="/recommendation"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Recommendation
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link
                href="/shop"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Shop
              </Link>
            </MenuItem>
          </Menu>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              <Link
                href="/home"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Home
              </Link>
            </Button>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              <Link
                href="/blog"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Blog
              </Link>
            </Button>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              <Link
                href="/recommendation"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Recommendation
              </Link>
            </Button>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              <Link
                href="/shop"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Shop
              </Link>
            </Button>
          </Box>
        </Box>

        <Box className="flex items-center gap-2 relative">
          <Input
            placeholder="Search users"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-2 py-1"
            sx={{ marginRight: "50px" }}
          />
          {searchTerm && filteredUsers.length > 0 && (
            <Popper
              open={Boolean(filteredUsers.length && searchTerm)}
              anchorEl={searchAnchorEl}
              placement="bottom-start"
              className="z-50"
            >
              <Paper className="shadow-lg border border-gray-200 mt-1 rounded">
                <List className="w-48 bg-white">
                  {filteredUsers.map((user) => (
                    <ListItem key={user.id} className="p-0">
                      <Link
                        href={`/profile/${user.id}`}
                        passHref
                        legacyBehavior
                      >
                        <ListItemButton
                          component="a"
                          className="hover:bg-gray-100"
                        >
                          {user.name}
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Popper>
          )}

          <Button
            variant="outlined"
            color="inherit"
            sx={{ textTransform: "none", borderColor: "#000" }}
            onClick={logoutBtnClick}
          >
            Logout
          </Button>
          {user && (
            <IconButton>
              <Link href={`/profile/${user.userId}`} passHref legacyBehavior>
                <a>
                  <AccountCircleOutlined />
                </a>
              </Link>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
