import { Button, Box, Typography } from "@mui/material";
import Link from "next/link";

export default function LandingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.5rem", sm: "4rem", md: "6rem", lg: "7rem" },
          fontStyle: "italic",
          marginBottom: "1rem",
        }}
      >
        Xrossfit
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: "600px",
          fontSize: { xs: "1rem", sm: "1.2rem" },
          marginBottom: "2rem",
        }}
      >
        Track daily exercises. Shop fitness equipment. Get personalized exercise
        recommendations. Connect with other fitness enthusiasts.
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            margin: "0.5rem",
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          <Link
            href="/signup"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Signup
          </Link>
        </Button>
        <Button
          variant="outlined"
          sx={{
            margin: "0.5rem",
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          <Link
            href="/login"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Login
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
