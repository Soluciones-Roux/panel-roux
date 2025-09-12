import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { StoreProvider } from "./components/models/rootStore";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>


          {/* Modificar rutas, privadas y publicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
