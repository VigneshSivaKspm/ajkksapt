import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Layers,
  ScrollText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  Bell,
  Building2,
  Briefcase,
  BarChart3,
  Sun,
  Moon,
  ImageIcon,
  Edit3,
  Users2,
  Quote,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { logoutUser } from "../../services/authService";
import toast from "react-hot-toast";

const NAV = [
  { to: "/", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/leads", icon: Users, label: "Leads" },
  { to: "/results", icon: FileText, label: "Results" },
  { to: "/placement", icon: Briefcase, label: "Placement" },
  { to: "/departments", icon: Building2, label: "Departments" },
  { to: "/announcements", icon: Bell, label: "Announcements" },
  { to: "/content", icon: Layers, label: "CMS" },
  { to: "/audit", icon: ScrollText, label: "Audit Logs", adminOnly: true },

  // Frontend Content Management
  { divider: true, label: "Frontend Content" },
  { to: "/hero-management", icon: ImageIcon, label: "Hero Slider" },
  { to: "/home-content", icon: Edit3, label: "Home Content" },
  { to: "/pages-content", icon: FileText, label: "Pages Content" },
  { to: "/gallery", icon: ImageIcon, label: "Gallery" },
  { to: "/testimonials", icon: Quote, label: "Testimonials" },
  { to: "/staff-directory", icon: Users2, label: "Staff Directory" },
];

const ROLE_BADGE = {
  super_admin: {
    label: "Super Admin",
    cls: "bg-brand-500/20 text-brand-400 border-brand-500/30",
  },
  dept_admin: {
    label: "Dept Admin",
    cls: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  staff: {
    label: "Staff",
    cls: "bg-green-500/20 text-green-400 border-green-500/30",
  },
};

export default function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    try {
      await logoutUser(user?.uid);
      navigate("/login");
    } catch {
      toast.error("Logout failed.");
    }
  }

  const badge = ROLE_BADGE[user?.role] ?? ROLE_BADGE.staff;
  const navItems = NAV.filter(
    (n) => !n.adminOnly || user?.role === "super_admin",
  );

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`
      ${mobile ? "flex" : "hidden lg:flex"} flex-col
      w-64 bg-surface-800 border-r border-surface-600
      h-full
    `}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-surface-600">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-white leading-none">
              AJKKSAPT
            </p>
            <p className="font-mono text-[10px] text-surface-400 uppercase tracking-widest mt-0.5">
              CMS Admin
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item, idx) => {
          if (item.divider) {
            return (
              <div key={idx} className="pt-3 pb-2">
                <p className="px-3 py-1 text-xs font-bold text-surface-500 uppercase tracking-widest">
                  {item.label}
                </p>
                <div className="mt-1 border-t border-surface-700" />
              </div>
            );
          }

          const { to, icon: Icon, label, end } = item;
          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${
                  isActive
                    ? "bg-brand-500/15 text-brand-400 border border-brand-500/25"
                    : "text-surface-400 hover:text-white hover:bg-surface-700"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} />
                  <span className="flex-1">{label}</span>
                  {isActive && (
                    <ChevronRight size={14} className="text-brand-500" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User panel */}
      <div className="p-4 border-t border-surface-600">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-display text-sm font-bold shrink-0">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">
              {user?.name ?? "User"}
            </p>
            <p className="text-xs text-surface-400 truncate">{user?.email}</p>
            <span
              className={`inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${badge.cls}`}
            >
              {badge.label}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-surface-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-surface-900 bg-grid overflow-hidden">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-64 h-full">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Desktop Topbar */}
        <header className="hidden lg:flex items-center justify-between px-6 py-4 bg-surface-800 border-b border-surface-600">
          <div />
          <ThemeToggle />
        </header>

        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-surface-800 border-b border-surface-600">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="text-surface-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <p className="font-display font-bold text-white text-sm">
              AJKKSAPT
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center w-12 h-6 rounded-full transition-colors bg-surface-700 hover:bg-surface-600 border border-surface-500"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span
        className={`absolute inline-flex items-center justify-center h-5 w-5 rounded-full transition-transform ${
          theme === "dark"
            ? "translate-x-6 bg-blue-500 shadow-lg shadow-blue-500/50"
            : "translate-x-0.5 bg-yellow-400 shadow-lg shadow-yellow-400/50"
        }`}
      >
        {theme === "dark" ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-white" />
        )}
      </span>
    </button>
  );
}
