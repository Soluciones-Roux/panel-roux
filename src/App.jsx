// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute, Layout, ThemeProvider } from "./components/core";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AlertContainer from "./components/core/Alerts/AlertContainer";
import { StoreProvider } from "./components/store/rootStore";
import useAuth from "./components/hooks/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <ThemeProvider>
      <StoreProvider>
        <Router>
          <AlertContainer />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
