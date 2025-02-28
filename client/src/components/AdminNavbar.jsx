import React from "react";
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

const AdminNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useLogout();
  const router = useRouter();

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
      <Toolbar sx={{ padding: 0, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
                href="/admin"
                style={{ textDecoration: "none", color: "inherit" }}
                passHref
              >
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link
                href="/admin/products"
                style={{ textDecoration: "none", color: "inherit" }}
                passHref
              >
                Manage Products
              </Link>
            </MenuItem>
          </Menu>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              <Link
                href="/admin"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Home
              </Link>
            </Button>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              <Link
                href="/admin/products"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Manage Products
              </Link>
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ textTransform: "none", borderColor: "#000" }}
            onClick={logoutBtnClick}
          >
            Logout
          </Button>
          <IconButton>
            <Link href="/profile" passHref>
              <AccountCircleOutlined />
            </Link>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
