import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ChatPage from "../pages/ChatPage";
import ProtectedRoute from "./ProtectedRoute";
import HomeRedirect from "./HomeRedirect";
import GuestRoute from "./GuestRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Guest-only routes */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
