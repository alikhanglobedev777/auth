import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

// PrivateRoute logic moved inside here
const PrivateRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  return token && user ? children : <Login />;
};

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
