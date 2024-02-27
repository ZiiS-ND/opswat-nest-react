import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { STORAGE_TOKEN_KEY } from "../constant/basic_constant";
import { useAuth } from "../provider/authProvider";

const Home = () => {
  const { setToken } = useAuth();
  return (
    <Box>
      <LoadingButton
        onClick={() => {
          setToken(null);
          window.localStorage.removeItem(STORAGE_TOKEN_KEY);
        }}
      >
        HELLO
      </LoadingButton>
    </Box>
  );
};

export default Home;
