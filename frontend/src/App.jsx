import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import About from "./pages/About";
import CreateGoal from "./pages/CreateGoal.jsx";
import SystemSection from "./component/System/SystemSection.jsx";
import RoadmapSection from "./component/Roadmap/RoadmapSection.jsx";
import TodoSection from "./component/Todo/TodoSection.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}
                <Route
          path="/creategoal/:id"
          element={
            <ProtectedRoute>
              <CreateGoal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todo/:id"
          element={
            <ProtectedRoute>
              <TodoSection />
            </ProtectedRoute>
          }
        />
          <Route
          path="/roadmap/:id"
          element={
            <ProtectedRoute>
              <RoadmapSection />
            </ProtectedRoute>
          }
        />  <Route
          path="/system/:id"
          element={
            <ProtectedRoute>
              <SystemSection />
            </ProtectedRoute>
          }
        />

         <Route path="/about" element={<About />} />

        <Route
          path="/chat/:goalId"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;