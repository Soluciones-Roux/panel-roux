// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { StoreProvider } from "./components/models/rootStore";
import { ProtectedRoute, Layout, ThemeProvider } from "./components/core";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AlertContainer from "./components/core/Alerts/AlertContainer";

function App() {
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
