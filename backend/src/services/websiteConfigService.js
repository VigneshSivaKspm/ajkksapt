// src/services/websiteConfigService.js
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { writeAuditLog } from "./authService";

const COL = "website_config";

/**
 * Get website configuration
 */
export async function getWebsiteConfig() {
  const snap = await getDocs(collection(db, COL));
  if (snap.docs.length === 0) return getDefaultConfig();

  const configs = {};
  snap.docs.forEach((doc) => {
    configs[doc.id] = doc.data();
  });
  return configs;
}

/**
 * Update specific configuration
 */
export async function updateConfig(key, value, user) {
  const docRef = doc(db, COL, key);
  await setDoc(
    docRef,
    { ...value, updatedAt: serverTimestamp() },
    { merge: true },
  );
  await writeAuditLog(user.uid, "UPDATE_CONFIG", { configKey: key });
}

/**
 * Get institution info
 */
export async function getInstitutionInfo() {
  const snap = await getDocs(collection(db, COL));
  const configs = {};
  snap.docs.forEach((doc) => {
    if (doc.id === "institution") configs[doc.id] = doc.data();
  });
  return configs.institution || getDefaultInstitutionInfo();
}

/**
 * Default configuration
 */
function getDefaultConfig() {
  return {
    institution: getDefaultInstitutionInfo(),
    contact: {
      email: "info@ajkksapt.edu",
      phone: "+91-0000-000000",
      address: "Campus Address",
    },
    social: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      youtube: "",
    },
  };
}

/**
 * Default institution info
 */
function getDefaultInstitutionInfo() {
  return {
    name: "AJKKSAPT",
    shortName: "AJKKSAPT",
    tagline: "Where Innovation Meets Excellence",
    description: "Campus Management System",
    founded: 2024,
    vision: "To be a premier institution fostering innovation and excellence.",
    mission:
      "To provide world-class education and foster technological advancement.",
    logo: "",
    favicon: "",
  };
}
