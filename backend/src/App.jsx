import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
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
import HeroManagementPage from "./pages/HeroManagementPage";
import HomeContentPage from "./pages/HomeContentPage";
import PagesContentPage from "./pages/PagesContentPage";
import GalleryManagementPage from "./pages/GalleryManagementPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import StaffDirectoryPage from "./pages/StaffDirectoryPage";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="content" element={<ContentPage />} />
          <Route path="announcements" element={<AnnouncementPage />} />
          <Route path="departments" element={<DepartmentPage />} />
          <Route path="placement" element={<PlacementPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="audit" element={<AuditPage />} />

          {/* Frontend Content Management */}
          <Route path="hero-management" element={<HeroManagementPage />} />
          <Route path="home-content" element={<HomeContentPage />} />
          <Route path="pages-content" element={<PagesContentPage />} />
          <Route path="gallery" element={<GalleryManagementPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="staff-directory" element={<StaffDirectoryPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
