import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/login";
import RegisterForm from "./pages/register-page";
import Home from "./homepage/home";
import AdminLoginForm from "./pages/admin-login";
import AdminDashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/login" element={<AdminLoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
