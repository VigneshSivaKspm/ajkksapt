import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Departments } from "./pages/Departments";
import { Examination } from "./pages/Examination";
import { Infrastructure } from "./pages/Infrastructure";
import { Admissions } from "./pages/Admissions";
import { Contact } from "./pages/Contact";
import { Placement } from "./pages/Placement";
import { Results } from "./pages/Results";
import { NotFound } from "./pages/NotFound";
import { NewsEvents } from "./pages/NewsEvents";
import { NoticeBoard } from "./pages/NoticeBoard";
import { CollegeActivities } from "./pages/CollegeActivities";
import { Gallery } from "./pages/Gallery";
import { Circulars } from "./pages/Circulars";
import { ImpactPage } from "./pages/ImpactPage";
import { StaffDirectory } from "./pages/StaffDirectory";
import { StudentLife } from "./pages/StudentLife";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "departments", Component: Departments },
      { path: "examination", Component: Examination },
      { path: "infrastructure", Component: Infrastructure },
      { path: "admission", Component: Admissions },
      { path: "contact", Component: Contact },
      { path: "placement", Component: Placement },
      { path: "results", Component: Results },
      { path: "news-events", Component: NewsEvents },
      { path: "notice-board", Component: NoticeBoard },
      { path: "college-activities", Component: CollegeActivities },
      { path: "gallery", Component: Gallery },
      { path: "circulars", Component: Circulars },
      { path: "impact", Component: ImpactPage },
      { path: "staff-directory", Component: StaffDirectory },
      { path: "student-life", Component: StudentLife },
      { path: "*", Component: NotFound },
    ],
  },
]);
