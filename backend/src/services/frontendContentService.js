import { db, storage } from "../firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Hero Management Service
export async function addHeroSlide(data) {
  try {
    const heroCollection = collection(db, "heroSlides");
    const docRef = await addDoc(heroCollection, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    throw new Error(`Failed to add hero slide: ${error.message}`);
  }
}

export async function updateHeroSlide(id, data) {
  try {
    const heroDoc = doc(db, "heroSlides", id);
    await updateDoc(heroDoc, {
      ...data,
      updatedAt: new Date(),
    });
    return { id, ...data };
  } catch (error) {
    throw new Error(`Failed to update hero slide: ${error.message}`);
  }
}

export async function deleteHeroSlide(id) {
  try {
    await deleteDoc(doc(db, "heroSlides", id));
  } catch (error) {
    throw new Error(`Failed to delete hero slide: ${error.message}`);
  }
}

export async function getHeroSlides() {
  try {
    const heroCollection = collection(db, "heroSlides");
    const q = query(heroCollection, orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error(`Failed to fetch hero slides: ${error.message}`);
  }
}

// Home Content Management
export async function updateHomeContent(sectionName, data) {
  try {
    const docRef = doc(db, "homeContent", sectionName);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
    return { id: sectionName, ...data };
  } catch (error) {
    // If document doesn't exist, create it
    try {
      const docRef = doc(db, "homeContent", sectionName);
      await setDoc(docRef, {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id: sectionName, ...data };
    } catch (createError) {
      throw new Error(`Failed to update home content: ${createError.message}`);
    }
  }
}

export async function getHomeContent(sectionName) {
  try {
    const docRef = doc(db, "homeContent", sectionName);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    throw new Error(`Failed to fetch home content: ${error.message}`);
  }
}

export async function getAllHomeContent() {
  try {
    const homeCollection = collection(db, "homeContent");
    const snapshot = await getDocs(homeCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error(`Failed to fetch all home content: ${error.message}`);
  }
}

// Pages Content Management
export async function updatePageContent(pageName, data) {
  try {
    const docRef = doc(db, "pagesContent", pageName);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
    return { id: pageName, ...data };
  } catch (error) {
    try {
      const docRef = doc(db, "pagesContent", pageName);
      await setDoc(docRef, {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id: pageName, ...data };
    } catch (createError) {
      throw new Error(`Failed to update page content: ${createError.message}`);
    }
  }
}

export async function getPageContent(pageName) {
  try {
    const docRef = doc(db, "pagesContent", pageName);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    throw new Error(`Failed to fetch page content: ${error.message}`);
  }
}

export async function getAllPagesContent() {
  try {
    const pagesCollection = collection(db, "pagesContent");
    const snapshot = await getDocs(pagesCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error(`Failed to fetch all pages content: ${error.message}`);
  }
}

// Gallery Management
export async function addGalleryItem(data, imageFile) {
  try {
    let imageUrl = data.imageUrl;

    if (imageFile) {
      const storageRef = ref(
        storage,
        `gallery/${Date.now()}_${imageFile.name}`,
      );
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const galleryCollection = collection(db, "gallery");
    const docRef = await addDoc(galleryCollection, {
      ...data,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { id: docRef.id, ...data, imageUrl };
  } catch (error) {
    throw new Error(`Failed to add gallery item: ${error.message}`);
  }
}

export async function updateGalleryItem(id, data, imageFile) {
  try {
    let imageUrl = data.imageUrl;

    if (imageFile) {
      const storageRef = ref(
        storage,
        `gallery/${Date.now()}_${imageFile.name}`,
      );
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const galleryDoc = doc(db, "gallery", id);
    await updateDoc(galleryDoc, {
      ...data,
      imageUrl,
      updatedAt: new Date(),
    });
    return { id, ...data, imageUrl };
  } catch (error) {
    throw new Error(`Failed to update gallery item: ${error.message}`);
  }
}

export async function deleteGalleryItem(id, imageUrl) {
  try {
    if (imageUrl) {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    }
    await deleteDoc(doc(db, "gallery", id));
  } catch (error) {
    throw new Error(`Failed to delete gallery item: ${error.message}`);
  }
}

export async function getGalleryItems() {
  try {
    const galleryCollection = collection(db, "gallery");
    const q = query(galleryCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error(`Failed to fetch gallery items: ${error.message}`);
  }
}

// Testimonials Management
export async function addTestimonial(data, imageFile) {
  try {
    let imageUrl = data.imageUrl;

    if (imageFile) {
      const storageRef = ref(
        storage,
        `testimonials/${Date.now()}_${imageFile.name}`,
      );
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const testimonialsCollection = collection(db, "testimonials");
    const docRef = await addDoc(testimonialsCollection, {
      ...data,
      imageUrl,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { id: docRef.id, ...data, imageUrl };
  } catch (error) {
    throw new Error(`Failed to add testimonial: ${error.message}`);
  }
}

export async function updateTestimonial(id, data, imageFile) {
  try {
    let imageUrl = data.imageUrl;

    if (imageFile) {
      const storageRef = ref(
        storage,
        `testimonials/${Date.now()}_${imageFile.name}`,
      );
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const testimonialDoc = doc(db, "testimonials", id);
    await updateDoc(testimonialDoc, {
      ...data,
      imageUrl,
      updatedAt: new Date(),
    });
    return { id, ...data, imageUrl };
  } catch (error) {
    throw new Error(`Failed to update testimonial: ${error.message}`);
  }
}

export async function deleteTestimonial(id, imageUrl) {
  try {
    if (imageUrl) {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    }
    await deleteDoc(doc(db, "testimonials", id));
  } catch (error) {
    throw new Error(`Failed to delete testimonial: ${error.message}`);
  }
}

export async function getTestimonials() {
  try {
    const testimonialsCollection = collection(db, "testimonials");
    const q = query(
      testimonialsCollection,
      where("isActive", "==", true),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error(`Failed to fetch testimonials: ${error.message}`);
  }
}

// Staff Directory Management
export async function addStaffMember(data, photoFile) {
  try {
    let photoUrl = data.photoUrl;

    if (photoFile) {
      const storageRef = ref(storage, `staff/${Date.now()}_${photoFile.name}`);
      await uploadBytes(storageRef, photoFile);
      photoUrl = await getDownloadURL(storageRef);
    }

    const staffCollection = collection(db, "staff");
    const docRef = await addDoc(staffCollection, {
      ...data,
      photoUrl,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { id: docRef.id, ...data, photoUrl };
  } catch (error) {
    throw new Error(`Failed to add staff member: ${error.message}`);
  }
}

export async function updateStaffMember(id, data, photoFile) {
  try {
    let photoUrl = data.photoUrl;

    if (photoFile) {
      const storageRef = ref(storage, `staff/${Date.now()}_${photoFile.name}`);
      await uploadBytes(storageRef, photoFile);
      photoUrl = await getDownloadURL(storageRef);
    }

    const staffDoc = doc(db, "staff", id);
    await updateDoc(staffDoc, {
      ...data,
      photoUrl,
      updatedAt: new Date(),
    });
    return { id, ...data, photoUrl };
  } catch (error) {
    throw new Error(`Failed to update staff member: ${error.message}`);
  }
}

export async function deleteStaffMember(id, photoUrl) {
  try {
    if (photoUrl) {
      const storageRef = ref(storage, photoUrl);
      await deleteObject(storageRef);
    }
    await deleteDoc(doc(db, "staff", id));
  } catch (error) {
    throw new Error(`Failed to delete staff member: ${error.message}`);
  }
}

export async function getStaffMembers(department = null) {
  try {
    const staffCollection = collection(db, "staff");
    let q;

    if (department) {
      q = query(
        staffCollection,
        where("isActive", "==", true),
        where("department", "==", department),
        orderBy("name", "asc"),
      );
    } else {
      q = query(
        staffCollection,
        where("isActive", "==", true),
        orderBy("name", "asc"),
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error(`Failed to fetch staff members: ${error.message}`);
  }
}

// Image Upload Helper
export async function uploadImage(file, path) {
  try {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

// Bulk Content Update
export async function updateMultipleContentSections(updates) {
  try {
    const promises = [];

    Object.entries(updates).forEach(([sectionName, data]) => {
      const docRef = doc(db, "homeContent", sectionName);
      promises.push(
        updateDoc(docRef, {
          ...data,
          updatedAt: new Date(),
        }).catch(() =>
          setDoc(docRef, {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        ),
      );
    });

    await Promise.all(promises);
    return { success: true, message: "All content updated successfully" };
  } catch (error) {
    throw new Error(`Failed to bulk update content: ${error.message}`);
  }
}

// Import setDoc for create or update pattern
import { setDoc } from "firebase/firestore";
