import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { ThemeProvider } from "./hooks/useTheme";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/shared/DashboardLayout";
import OverviewPage from "./pages/OverviewPage";
import LeadsPage from "./pages/LeadsPage";
import ResultsPage from "./pages/ResultsPage";
import ContentPage from "./pages/ContentPage";
import AuditPage from "./pages/AuditPage";
import AnnouncementPage from "./pages/AnnouncementPage";
import DepartmentPage from "./pages/DepartmentPage";
import PlacementPage from "./pages/PlacementPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LoadingScreen from "./components/shared/LoadingScreen";

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;

  return (
    <ThemeProvider>
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OverviewPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="announcements" element={<AnnouncementPage />} />
        <Route path="departments" element={<DepartmentPage />} />
        <Route path="placement" element={<PlacementPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route
          path="audit"
          element={
            <ProtectedRoute roles={["super_admin"]}>
              <AuditPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </ThemeProvider>
  );
}
