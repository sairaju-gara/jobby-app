import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import JobItemDetails from "./components/JobItemDetails";
import "./App.css";

const App = () => (
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />

    <Route
      path="/jobs"
      element={
        <ProtectedRoute>
          <Jobs />
        </ProtectedRoute>
      }
    />

    <Route
      path="/jobs/:jobId"
      element={
        <ProtectedRoute>
          <JobItemDetails />
        </ProtectedRoute>
      }
    />

    <Route path="/not-found" element={<NotFound />} />

    <Route path="*" element={<Navigate to="/not-found" replace />} />
  </Routes>
);

export default App;
