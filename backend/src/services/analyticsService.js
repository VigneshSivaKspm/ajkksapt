// src/services/analyticsService.js
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const ANALYTICS_COL = "analytics_events";
const LEADS_COL = "leads";
const RESULTS_COL = "results";

/**
 * Record analytics event
 */
export async function recordAnalyticsEvent(eventType, metadata = {}) {
  try {
    // This would be implemented with a server-side function
    // For now, just log it
    console.log(`Analytics: ${eventType}`, metadata);
  } catch (err) {
    console.error("Analytics error:", err);
  }
}

/**
 * Get lead analytics
 */
export async function getLeadAnalytics(startDate, endDate, deptId = null) {
  const q = deptId
    ? query(
        collection(db, LEADS_COL),
        where("timestamp", ">=", startDate),
        where("timestamp", "<=", endDate),
        where("departmentId", "==", deptId),
      )
    : query(
        collection(db, LEADS_COL),
        where("timestamp", ">=", startDate),
        where("timestamp", "<=", endDate),
      );

  const snap = await getDocs(q);
  const leads = snap.docs.map((d) => d.data());

  return {
    totalLeads: leads.length,
    bySource: groupBy(leads, "source"),
    byStatus: groupBy(leads, "status"),
    conversionRate: calculateConversionRate(leads),
  };
}

/**
 * Get results analytics
 */
export async function getResultsAnalytics(semester, deptId = null) {
  const q = deptId
    ? query(
        collection(db, RESULTS_COL),
        where("semester", "==", semester),
        where("departmentId", "==", deptId),
      )
    : query(collection(db, RESULTS_COL), where("semester", "==", semester));

  const snap = await getDocs(q);
  const results = snap.docs.map((d) => d.data());

  const grades = results.map((r) => r.grade);
  const gpa = results.map((r) => parseFloat(r.gpa) || 0);

  return {
    totalStudents: results.length,
    averageGPA:
      gpa.length > 0
        ? (gpa.reduce((a, b) => a + b) / gpa.length).toFixed(2)
        : 0,
    gradeDistribution: groupBy(results, "grade"),
    passed: results.filter((r) => r.status === "pass").length,
    failed: results.filter((r) => r.status === "fail").length,
  };
}

/**
 * Get dashboard summary
 */
export async function getDashboardSummary(user) {
  const leadsSnap =
    user.role === "super_admin"
      ? await getDocs(collection(db, LEADS_COL))
      : await getDocs(
          query(
            collection(db, LEADS_COL),
            where("departmentId", "==", user.departmentId),
          ),
        );

  const resultsSnap =
    user.role === "super_admin"
      ? await getDocs(collection(db, RESULTS_COL))
      : await getDocs(
          query(
            collection(db, RESULTS_COL),
            where("departmentId", "==", user.departmentId),
          ),
        );

  return {
    totalLeads: leadsSnap.docs.length,
    activeLeads: leadsSnap.docs.filter((d) => d.data().status === "active")
      .length,
    totalResults: resultsSnap.docs.length,
    recentLeads: leadsSnap.docs
      .slice(0, 5)
      .map((d) => ({ id: d.id, ...d.data() })),
  };
}

/**
 * Helper: Group by property
 */
function groupBy(arr, prop) {
  return arr.reduce((acc, obj) => {
    const key = obj[prop] || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Helper: Calculate conversion rate
 */
function calculateConversionRate(leads) {
  if (leads.length === 0) return 0;
  const converted = leads.filter((l) => l.status === "converted").length;
  return ((converted / leads.length) * 100).toFixed(2);
}
