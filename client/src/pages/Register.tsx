import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import httpClientInstance from "../httpClient";

const Register = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
      username: data.get("username"),
      fullname: data.get("fullname"),
    };

    try {
      await httpClientInstance.post("/register", jsonData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="username"
          label="Username"
          id="username"
          autoComplete="username"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="fullname"
          label="Fullname"
          id="fullname"
          autoComplete="fullname"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/login">{"Already have an account? Log In"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Register;
