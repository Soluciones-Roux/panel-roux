// App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./components/core";
import AlertContainer from "./components/core/Alerts/AlertContainer";
import { StoreProvider } from "./components/store/rootStore";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <Router>
          <AlertContainer />
          <AppRoutes />
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
