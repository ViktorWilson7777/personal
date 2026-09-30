import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AccountPage from "@/pages/AccountPage";
import { ShaderBackground } from "@/components/ShaderBackground";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ShaderBackground />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
