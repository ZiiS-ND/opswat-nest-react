import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME } from "../constant/routes";
import authApi from "../api/authApi";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirmPassword = data.get("confirm-password");
    const email = data.get("email");
    const fullname = data.get("fullname");
    const username = data.get("username");

    if (password !== confirmPassword) {
      setErrMessage("Confirm password not match!");

      return;
    }

    if (!email || !fullname || !username || !password || !confirmPassword) {
      setErrMessage("Invalid payload");

      return;
    }

    const jsonData = {
      email: email.toString(),
      password: password.toString(),
      username: username.toString(),
      fullname: fullname.toString(),
    };

    try {
      setLoading(true);
      await authApi.register(jsonData);
      navigate(HOME, { replace: true });
    } catch (e) {
      let errMessage = "Error";
      if (e instanceof AxiosError) {
        errMessage = e.response?.data?.message;
      } else if (e instanceof Error) {
        e.message;
      }
      setErrMessage(errMessage);
      setLoading(false);
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
          name="confirm-password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="confirm-password"
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
        {errMessage && (
          <Typography sx={{ color: "red" }}>{errMessage}</Typography>
        )}
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={loading}
        >
          Sign In
        </LoadingButton>
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
