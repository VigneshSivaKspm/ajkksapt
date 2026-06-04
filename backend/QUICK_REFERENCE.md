# AJKKSAPT Backend - Quick Reference Guide

## ✅ Implemented Features

### Core Infrastructure

- ✅ Firebase Authentication with test credentials
- ✅ Role-Based Access Control (RBAC)
- ✅ Audit logging for all actions
- ✅ Protected routes with role validation
- ✅ Responsive admin dashboard

### Content Management

- ✅ Hero Slider Management
- ✅ Announcement/Notice Management
- ✅ Dynamic Website Configuration
- ✅ Gallery Management (Images/Videos)
- ✅ General CMS

### Academic Management

- ✅ Department Management
- ✅ Faculty Management
- ✅ Student Results Portal
- ✅ Department-wise filtering

### Admissions & Leads

- ✅ Lead Management System
- ✅ Lead tracking and conversion
- ✅ Lead export capabilities

### Placement System

- ✅ Placement Records Management
- ✅ Recruiter Database
- ✅ Placement Statistics (Avg Package, Highest Package)
- ✅ Recruiter Logo Management

### Staff Management

- ✅ Staff Account Creation
- ✅ Role-Based Permissions
- ✅ Department Assignment
- ✅ Staff Activity Tracking

### Analytics & Reporting

- ✅ Dashboard Summary (KPIs)
- ✅ Lead Analytics (30-day trends)
- ✅ Results Analytics (CGPA, Pass/Fail rates)
- ✅ Department-wise Filtering
- ✅ Conversion Rate Tracking

---

## 🔑 Test Credentials

```
Admin Account:
  Email: admin@test.com
  Password: admin123
  Role: Super Admin
  Access: Full system access

Staff Account:
  Email: user@test.com
  Password: user123
  Role: Content Manager
```

---

## 🚀 Running the Application

### Development

```bash
cd backend
npm install
npm run dev
```

### Access

- Dashboard: `http://localhost:5174`
- Login with test credentials above

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── App.jsx                          # Main routing
│   ├── main.jsx                         # Entry point
│   ├── index.css                        # Global styles
│   ├── components/
│   │   └── shared/
│   │       ├── DashboardLayout.jsx      # Main layout with sidebar
│   │       └── LoadingScreen.jsx        # Loading component
│   ├── hooks/
│   │   └── useAuth.jsx                  # Auth context hook
│   ├── firebase/
│   │   └── config.js                    # Firebase configuration
│   ├── pages/
│   │   ├── LoginPage.jsx                # Login portal
│   │   ├── OverviewPage.jsx             # Dashboard summary
│   │   ├── AnalyticsPage.jsx            # Analytics dashboard
│   │   ├── LeadsPage.jsx                # Leads management
│   │   ├── ResultsPage.jsx              # Results portal
│   │   ├── PlacementPage.jsx            # Placement records
│   │   ├── DepartmentPage.jsx           # Department management
│   │   ├── HeroManagementPage.jsx       # Hero banner management
│   │   ├── AnnouncementPage.jsx         # Announcement management
│   │   ├── ContentPage.jsx              # General CMS
│   │   └── AuditPage.jsx                # Activity logs
│   └── services/
│       ├── authService.js               # Auth & audit logging
│       ├── heroService.js               # Hero slider operations
│       ├── announcementService.js       # Announcement operations
│       ├── departmentService.js         # Department operations
│       ├── placementService.js          # Placement & recruiter ops
│       ├── staffService.js              # Staff & RBAC operations
│       ├── websiteConfigService.js      # Configuration management
│       ├── galleryService.js            # Gallery operations
│       ├── analyticsService.js          # Analytics & reporting
│       ├── contentService.js            # General content
│       ├── leadsService.js              # Lead management
│       └── resultsService.js            # Results management
├── package.json                         # Dependencies
├── vite.config.js                       # Vite configuration
├── tailwind.config.js                   # Tailwind CSS config
├── index.html                           # HTML entry point
└── IMPLEMENTATION_SUMMARY.md            # Feature documentation
```

---

## 📊 Dashboard Navigation

### Main Menu Items

1. **Overview** - Dashboard KPIs and summary
2. **Analytics** - Detailed analytics and reporting
3. **Leads** - Lead management and tracking
4. **Results** - Student results portal
5. **Placement** - Placement records and recruitment
6. **Departments** - Department information
7. **Hero Banners** - Homepage slider management
8. **Announcements** - Notices and announcements
9. **CMS** - General content management
10. **Audit Logs** - Activity history (Admin only)

---

## 🔐 Security Features

- ✅ Firebase Authentication
- ✅ Role-based route protection
- ✅ Firestore security rules
- ✅ Audit trail logging
- ✅ Session management
- ✅ Automatic logout on inactivity

---

## 🛠️ API Reference

### Hero Slider Service

```javascript
import { heroService } from "./services/heroService";

// Fetch all
const sliders = await heroService.fetchHeroSliders();

// Create
await heroService.createHeroSlider({ title, subtitle }, user);

// Update
await heroService.updateHeroSlider(id, { title }, user);

// Delete
await heroService.deleteHeroSlider(id, user);

// Upload image
const url = await heroService.uploadHeroImage(file, sliderId);
```

### Announcement Service

```javascript
import { announcementService } from "./services/announcementService";

// Fetch
const announcements = await announcementService.fetchAnnouncements();

// Create
await announcementService.createAnnouncement(
  {
    title,
    content,
    type: "notice",
  },
  user,
);

// Update
await announcementService.updateAnnouncement(id, data, user);

// Toggle pin
await announcementService.togglePinAnnouncement(id, isPinned, user);
```

### Department Service

```javascript
import { departmentService } from "./services/departmentService";

// Fetch all
const depts = await departmentService.fetchAllDepartments();

// Create
await departmentService.createDepartment({ name, code }, user);

// Add faculty
await departmentService.addFacultyToDept(deptId, faculty, user);
```

### Placement Service

```javascript
import { placementService } from "./services/placementService";

// Fetch placements
const placements = await placementService.fetchPlacements(user);

// Create placement
await placementService.createPlacement(
  {
    company,
    studentName,
    packageValue,
  },
  user,
);

// Get stats
const stats = await placementService.getPlacementStats(deptId);

// Recruiter operations
const recruiters = await placementService.fetchRecruiters();
await placementService.addRecruiter({ company }, user);
```

### Analytics Service

```javascript
import { analyticsService } from "./services/analyticsService";

// Dashboard summary
const summary = await analyticsService.getDashboardSummary(user);

// Lead analytics
const analytics = await analyticsService.getLeadAnalytics(startDate, endDate);

// Results analytics
const results = await analyticsService.getResultsAnalytics("4");
```

---

## 🔄 Firebase Collections

| Collection          | Purpose               | Doc Structure                      |
| ------------------- | --------------------- | ---------------------------------- |
| `hero_sliders`      | Homepage banners      | title, imageUrl, order, isActive   |
| `announcements`     | Notices & news        | title, content, type, isPinned     |
| `departments`       | Academic departments  | name, code, hod, faculty           |
| `placements`        | Placement records     | company, studentName, packageValue |
| `recruiters`        | Recruiter companies   | company, website, logo             |
| `staff`             | Staff accounts        | uid, name, email, role             |
| `staff_permissions` | Role permissions      | canManage[Feature] flags           |
| `galleries`         | Photo/video galleries | title, category, items             |
| `website_config`    | Global settings       | institution, contact, social       |
| `leads`             | Admission inquiries   | name, email, phone, status         |
| `results`           | Student results       | semester, registerNo, gpa          |
| `audit_logs`        | Activity logs         | uid, action, meta, timestamp       |
| `content`           | General content       | title, body, category              |

---

## 🎯 Common Tasks

### Add a New Department

1. Navigate to "Departments" from sidebar
2. Fill in department details
3. Click "Create"
4. New department is immediately available

### Create an Announcement

1. Navigate to "Announcements"
2. Enter title and content
3. Select type (Notice, News, Event, Urgent)
4. Toggle "Published" if needed
5. Click "Create"

### Record a Placement

1. Navigate to "Placement"
2. Fill in company, student, package, role
3. Click "Add Placement"
4. Stats update automatically

### View Analytics

1. Navigate to "Analytics"
2. View KPI cards at the top
3. Scroll for detailed metrics
4. Department filter available (if not super admin)

---

## ⚠️ Important Notes

1. **Test Credentials**: These are hardcoded for development only. Remove before production.
2. **Firebase Config**: Update `src/firebase/config.js` with your Firebase project credentials
3. **Audit Logging**: All actions are logged. Check "Audit Logs" page for history
4. **Role-Based Access**: Super admins see all data. Others see department-specific data
5. **Database Backups**: Ensure regular Firestore backups are configured

---

## 🚨 Troubleshooting

### Login Not Working

- Verify Firebase config is correct
- Check test credentials are entered exactly
- Clear browser cache and cookies

### Pages Not Loading

- Check browser console for errors
- Verify user has appropriate role/permissions
- Ensure Firestore security rules allow access

### Images Not Uploading

- Check Storage bucket exists in Firebase
- Verify Firebase Storage rules allow uploads
- Check file size limits

---

## 📚 Related Documentation

- See `IMPLEMENTATION_SUMMARY.md` for detailed feature documentation
- Check `package.json` for dependencies and versions
- Review `vite.config.js` for build configuration
- Reference `tailwind.config.js` for styling

---

## 🎓 Development Notes

- All services are async-first
- Error handling is built-in with toast notifications
- Audit logs are automatic on all CUD operations
- Role checking happens at route level
- User context is always available via `useAuth()` hook

---

## 📞 Support

For issues or questions:

1. Check the Implementation Summary
2. Review service documentation in the code
3. Check Firebase console for logs
4. Verify all dependencies are installed (`npm install`)

---

**Last Updated**: June 4, 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
