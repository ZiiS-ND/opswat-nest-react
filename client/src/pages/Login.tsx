import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { HOME } from "../constant/routes";
import { useAuth } from "../provider/authProvider";

const Login = () => {
  const { setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password) {
      setErrMessage("Invalid payload");
      return;
    }

    const jsonData = {
      email: email.toString(),
      password: password.toString(),
    };

    try {
      setLoading(true);
      const res = await authApi.login(jsonData);
      navigate(HOME, { replace: true });
      const token = res.data.token;
      setToken(token);
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
        Log in
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
          Log In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/register">{"Don't have an account? Register"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
