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
import ChatPage from "./component/common/ChatPage.jsx";
import Feedback from "./component/common/Feedback.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import ChatSection from "./component/common/ChatSection.jsx";
import  Loader  from "./component/common/Loader.jsx";
import TextLoader from "./component/common/TextLoader.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<TextLoader />} />

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
          path="/creategoal"
          element={
            <ProtectedRoute>
              <CreateGoal />
            </ProtectedRoute>
          }
        />

         <Route
          path="/chatSection/:id"
          element={
            <ProtectedRoute>
              <ChatSection />
            </ProtectedRoute>
          }
        />

         <Route
          path="/chatpage/:id"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

                <Route
          path="/accountPage/:id"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback/:id"
          element={
            <ProtectedRoute>
              <Feedback />
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