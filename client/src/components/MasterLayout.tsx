import { LoadingButton } from "@mui/lab";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { ARTICLE, HOME, USER } from "../constant/routes";

type MasterLayoutProps = {
  children: ReactNode;
};

const MasterLayout = ({ children }: MasterLayoutProps) => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/", { replace: true });
    setToken(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Article management app
            </Typography>
            <LoadingButton color="inherit" onClick={() => navigate(HOME)}>
              Home
            </LoadingButton>
            <LoadingButton color="inherit" onClick={() => navigate(USER)}>
              User
            </LoadingButton>
            <LoadingButton color="inherit" onClick={() => navigate(ARTICLE)}>
              Article
            </LoadingButton>
            <LoadingButton color="inherit" onClick={logout}>
              Log out
            </LoadingButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Container>
        <Box sx={{ my: 2 }}>{children}</Box>
      </Container>
    </>
  );
};

export default MasterLayout;
