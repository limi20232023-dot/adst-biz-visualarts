import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import DepartmentTabs from './components/DepartmentTabs';
import ImageGallery from './components/ImageGallery';
import TeachersGallery from './components/TeachersGallery';
import Lightbox from './components/Lightbox';
import TeacherLightbox from './components/TeacherLightbox';
import Footer from './components/Footer';
import { departments, defaultTeachers, type GalleryImage, type Teacher } from './data/departments';

type DepartmentImagesMap = Record<string, GalleryImage[]>;

const STORAGE_KEY_IMAGES = 'adst-gallery-images-v3';
const STORAGE_KEY_TAB = 'adst-active-tab-v3';
const STORAGE_KEY_TITLE = 'adst-site-title';
const STORAGE_KEY_TEACHERS = 'adst-teachers-v3';
const STORAGE_KEY_TEACHERS_SUBTITLE = 'adst-teachers-subtitle';

function loadSavedImages(): DepartmentImagesMap | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_IMAGES);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DepartmentImagesMap;
    const valid = departments.every((d) => Array.isArray(parsed[d.id]));
    if (!valid) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveImages(images: DepartmentImagesMap): void {
  try {
    localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(images));
  } catch (e) {
    console.warn('Failed to save gallery to localStorage:', e);
  }
}

function getDefaultImages(): DepartmentImagesMap {
  return Object.fromEntries(departments.map((d) => [d.id, d.images]));
}

function loadSavedTeachers(): Teacher[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEACHERS);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Teacher[];
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveTeachers(teachers: Teacher[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_TEACHERS, JSON.stringify(teachers));
  } catch (e) {
    console.warn('Failed to save teachers to localStorage:', e);
  }
}

function loadSavedTab(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TAB);
    const validTabIds = [...departments.map((d) => d.id), 'teachers'];
    if (raw && validTabIds.includes(raw)) return raw;
  } catch { /* ignore */ }
  return 'computer-science';
}

export default function App() {
  const [activeTab, setActiveTab] = useState(loadSavedTab);
  const [editMode, setEditMode] = useState(false);
  const [galleryImages, setGalleryImages] = useState<DepartmentImagesMap>(
    () => loadSavedImages() ?? getDefaultImages()
  );
  const [teachers, setTeachers] = useState<Teacher[]>(
    () => loadSavedTeachers() ?? defaultTeachers
  );
  const [teachersSubtitle, setTeachersSubtitle] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_TEACHERS_SUBTITLE)
        || 'Meet our hardworking educators';
    } catch {
      return 'Meet our hardworking educators';
    }
  });
  const [siteTitle, setSiteTitle] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_TITLE) || 'ADST-BiZ-VISUAL ARTS-EXHINITION-MLIA';
    } catch { return 'ADST-BiZ-VISUAL ARTS-EXHINITION-MLIA'; }
  });
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [teacherLightboxTeacher, setTeacherLightboxTeacher] = useState<Teacher | null>(null);
  const [teacherLightboxIndex, setTeacherLightboxIndex] = useState(0);

  // Persist gallery images to localStorage whenever they change
  useEffect(() => {
    saveImages(galleryImages);
  }, [galleryImages]);

  // Persist teachers to localStorage whenever they change
  useEffect(() => {
    saveTeachers(teachers);
  }, [teachers]);

  // Persist teachers subtitle to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEACHERS_SUBTITLE, teachersSubtitle);
    } catch { /* ignore */ }
  }, [teachersSubtitle]);

  const handleTeachersSubtitleChange = useCallback((subtitle: string) => {
    setTeachersSubtitle(subtitle);
  }, []);

  // Persist active tab to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TAB, activeTab);
    } catch { /* ignore */ }
  }, [activeTab]);

  // Persist site title to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TITLE, siteTitle);
    } catch { /* ignore */ }
  }, [siteTitle]);

  const handleTitleChange = useCallback((title: string) => {
    setSiteTitle(title);
  }, []);

  const currentDept = departments.find((d) => d.id === activeTab);
  const currentImages = galleryImages[activeTab] || [];
  const isTeachersTab = activeTab === 'teachers';

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id);
    setLightboxImage(null);
    setTeacherLightboxTeacher(null);
  }, []);

  const handleUpdateImages = useCallback((images: GalleryImage[]) => {
    setGalleryImages((prev) => ({ ...prev, [activeTab]: images }));
  }, [activeTab]);

  const handleUpdateTeachers = useCallback((updatedTeachers: Teacher[]) => {
    setTeachers(updatedTeachers);
  }, []);

  const handleOpenLightbox = useCallback((image: GalleryImage, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  const handleNavigateLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxImage(currentImages[index]);
  }, [currentImages]);

  const handleOpenTeacherLightbox = useCallback((teacher: Teacher, index: number) => {
    setTeacherLightboxTeacher(teacher);
    setTeacherLightboxIndex(index);
  }, []);

  const handleCloseTeacherLightbox = useCallback(() => {
    setTeacherLightboxTeacher(null);
  }, []);

  const handleNavigateTeacherLightbox = useCallback((index: number) => {
    setTeacherLightboxIndex(index);
    setTeacherLightboxTeacher(teachers[index]);
  }, [teachers]);

  const handleToggleEdit = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-noir-bg text-white font-inter relative overflow-hidden flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-noir-bg via-noir-surface to-noir-bg" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.03)_0%,_transparent_60%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,217,255,0.02)_0%,_transparent_50%)]" />
      <ParticleBackground />

      {/* Main Content */}
      <div className="relative z-10 flex-1">
        <Header editMode={editMode} onToggleEdit={handleToggleEdit} title={siteTitle} onTitleChange={handleTitleChange} />
        <DepartmentTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <AnimatePresence mode="wait">
          {isTeachersTab ? (
            <TeachersGallery
              key="teachers"
              teachers={teachers}
              editMode={editMode}
              subtitle={teachersSubtitle}
              onSubtitleChange={handleTeachersSubtitleChange}
              onUpdateTeachers={handleUpdateTeachers}
              onOpenLightbox={handleOpenTeacherLightbox}
            />
          ) : currentDept ? (
            <ImageGallery
              key={activeTab}
              departmentId={activeTab}
              departmentName={currentDept.name}
              images={currentImages}
              editMode={editMode}
              color={currentDept.color}
              onUpdateImages={handleUpdateImages}
              onOpenLightbox={handleOpenLightbox}
            />
          ) : null}
        </AnimatePresence>

        <Footer />
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox
            image={lightboxImage}
            images={currentImages}
            index={lightboxIndex}
            onClose={handleCloseLightbox}
            onNavigate={handleNavigateLightbox}
          />
        )}
      </AnimatePresence>

      {/* Teacher Lightbox */}
      <AnimatePresence>
        {teacherLightboxTeacher && (
          <TeacherLightbox
            teacher={teacherLightboxTeacher}
            teachers={teachers}
            index={teacherLightboxIndex}
            onClose={handleCloseTeacherLightbox}
            onNavigate={handleNavigateTeacherLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
