import "./App.css";
import Routes from "./Routes";
import AuthProvider from "./provider/authProvider";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
