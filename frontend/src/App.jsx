import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
import ActionPage from "./component/ActionSection/Action.jsx";
import UpdateForm from "./component/Goal/UpdateForm.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

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
          path="/verify-email"
          element={<VerifyEmail/>}
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
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdateForm />
            </ProtectedRoute>
          }
        />

         <Route
          path="/chatSection"
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
          path="/accountPage"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
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
        
         <Route
          path="/action/:id"
          element={
            <ProtectedRoute>
              <ActionPage/>
            </ProtectedRoute>
          }
        />

         <Route path="/about" element={<About />} />

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