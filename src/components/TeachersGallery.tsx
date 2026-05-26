import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, ImagePlus, Upload, User, Users, Check, Pencil } from 'lucide-react';
import type { Teacher } from '../data/departments';

interface TeachersGalleryProps {
  teachers: Teacher[];
  editMode: boolean;
  subtitle: string;
  onSubtitleChange: (subtitle: string) => void;
  onUpdateTeachers: (teachers: Teacher[]) => void;
  onOpenLightbox: (teacher: Teacher, index: number) => void;
}

const departmentLabel: Record<string, string> = {
  'computer-science': 'Computer Science',
  'visual-arts': 'Visual Arts',
  'business': 'Business',
};

const departmentAccent: Record<string, string> = {
  'computer-science': '#00D9FF',
  'visual-arts': '#D4AF37',
  'business': '#D4AF37',
};

export default function TeachersGallery({
  teachers,
  editMode,
  subtitle,
  onSubtitleChange,
  onUpdateTeachers,
  onOpenLightbox,
}: TeachersGalleryProps) {
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
  const [subtitleDraft, setSubtitleDraft] = useState(subtitle);
  const subtitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSubtitleDraft(subtitle);
  }, [subtitle]);

  useEffect(() => {
    if (isEditingSubtitle && subtitleInputRef.current) {
      subtitleInputRef.current.focus();
      subtitleInputRef.current.select();
    }
  }, [isEditingSubtitle]);

  const handleSubtitleSave = () => {
    const trimmed = subtitleDraft.trim();
    if (trimmed && trimmed !== subtitle) {
      onSubtitleChange(trimmed);
    } else {
      setSubtitleDraft(subtitle);
    }
    setIsEditingSubtitle(false);
  };

  const handleSubtitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubtitleSave();
    } else if (e.key === 'Escape') {
      setSubtitleDraft(subtitle);
      setIsEditingSubtitle(false);
    }
  };
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editDept, setEditDept] = useState('computer-science');

  const handleEditStart = (teacher: Teacher) => {
    setEditingId(teacher.id);
    setEditName(teacher.name);
    setEditBio(teacher.bio);
    setEditDept(teacher.department);
  };

  const handleEditSave = () => {
    if (editingId) {
      onUpdateTeachers(
        teachers.map((t) =>
          t.id === editingId
            ? { ...t, name: editName, bio: editBio, department: editDept as Teacher['department'] }
            : t
        )
      );
      setEditingId(null);
    }
  };

  const handleDelete = (id: string) => {
    onUpdateTeachers(teachers.filter((t) => t.id !== id));
  };

  const handleAddTeacher = () => {
    const newId = `t-${Date.now()}`;
    const newTeacher: Teacher = {
      id: newId,
      src: '',
      name: 'New Teacher',
      department: 'computer-science',
      bio: 'Click to edit biography...',
    };
    onUpdateTeachers([...teachers, newTeacher]);
    setTimeout(() => handleEditStart(newTeacher), 100);
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onUpdateTeachers(
          teachers.map((t) =>
            t.id === id ? { ...t, src: ev.target?.result as string } : t
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const deptGroups: Record<string, Teacher[]> = {
    'computer-science': [],
    'visual-arts': [],
    'business': [],
  };
  teachers.forEach((t) => {
    if (deptGroups[t.department]) {
      deptGroups[t.department].push(t);
    }
  });

  const deptOrder: { id: string; label: string; accent: string }[] = [
    { id: 'computer-science', label: 'Computer Science', accent: '#00D9FF' },
    { id: 'visual-arts', label: 'Visual Arts', accent: '#D4AF37' },
    { id: 'business', label: 'Business', accent: '#D4AF37' },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
      {/* Header */}
      <motion.div
        key="teachers"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 md:mb-14"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center border border-gold/30"
            style={{ boxShadow: '0 4px 20px rgba(212,175,55,0.15)' }}
          >
            <Users className="w-6 h-6 text-gold" />
          </div>
        </div>
        <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3 text-gradient-gold">
          Our Teachers
        </h2>
        <div className="w-16 h-[2px] mx-auto mb-4 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="relative inline-block">
          <p className="font-inter text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            {subtitle}
          </p>
          {editMode && (
            <div className="mt-2">
              {isEditingSubtitle ? (
                <div className="flex flex-col items-center gap-2 animate-fade-in-up">
                  <input
                    ref={subtitleInputRef}
                    type="text"
                    value={subtitleDraft}
                    onChange={(e) => setSubtitleDraft(e.target.value)}
                    onKeyDown={handleSubtitleKeyDown}
                    onBlur={handleSubtitleSave}
                    placeholder="Enter subtitle text..."
                    className="w-full max-w-md px-4 py-2 rounded-xl bg-noir-card border-2 border-gold/40 text-white/60 font-inter text-sm text-center focus:outline-none focus:border-gold/60 placeholder:text-white/20"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubtitleSave}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gold/20 border border-gold/30 text-gold text-xs font-inter tracking-wider uppercase hover:bg-gold/30 transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Save
                    </button>
                    <button
                      onClick={() => { setSubtitleDraft(subtitle); setIsEditingSubtitle(false); }}
                      className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-inter tracking-wider uppercase hover:bg-white/10 hover:text-white/70 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingSubtitle(true)}
                  className="group/edit flex items-center gap-2 mx-auto px-4 py-1.5 rounded-lg border border-dashed border-gold/20 text-gold/50 hover:border-gold/40 hover:text-gold transition-all"
                >
                  <Pencil className="w-3 h-3" />
                  <span className="text-[10px] font-inter tracking-[0.15em] uppercase">
                    Edit Subtitle
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Department Groups */}
      <motion.div
        key="teachers-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {deptOrder.map((dept) => {
          const deptTeachers = deptGroups[dept.id];
          if (deptTeachers.length === 0) return null;

          return (
            <div key={dept.id} className="mb-10 md:mb-14">
              {/* Department Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-[1px] flex-1"
                  style={{ background: `linear-gradient(90deg, transparent, ${dept.accent}40, transparent)` }}
                />
                <h3
                  className="font-montserrat text-xs md:text-sm tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-md"
                  style={{
                    color: dept.accent,
                    background: `${dept.accent}10`,
                    border: `1px solid ${dept.accent}20`,
                  }}
                >
                  {dept.label}
                </h3>
                <div
                  className="h-[1px] flex-1"
                  style={{ background: `linear-gradient(90deg, transparent, ${dept.accent}40, transparent)` }}
                />
              </div>

              {/* Teachers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                <AnimatePresence mode="popLayout">
                  {deptTeachers.map((teacher, index) => {
                    const accent = departmentAccent[teacher.department] || '#D4AF37';
                    return (
                      <motion.div
                        key={teacher.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        className="group relative rounded-2xl overflow-hidden cursor-pointer"
                        style={{ aspectRatio: '3/4' }}
                        onMouseEnter={() => setHoveredId(teacher.id)}
                        onMouseLeave={() => {
                          setHoveredId(null);
                          if (!editMode) setEditingId(null);
                        }}
                        onClick={() => {
                          if (!editMode) {
                            onOpenLightbox(teacher, teachers.findIndex((t) => t.id === teacher.id));
                          }
                        }}
                      >
                        {/* Photo */}
                        {teacher.src ? (
                          <img
                            src={teacher.src}
                            alt={teacher.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (teacher.fallbackSrc && !target.src.includes(teacher.fallbackSrc)) {
                                target.src = teacher.fallbackSrc;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center"
                            style={{ background: `linear-gradient(135deg, ${accent}10, rgba(26,26,26,1))` }}
                          >
                            <User className="w-14 h-14 mb-3 opacity-40" style={{ color: accent }} />
                            <span className="font-inter text-white/20 text-xs tracking-wider uppercase">
                              {teacher.name}
                            </span>
                          </div>
                        )}

                        {/* View Mode: Hover Overlay with Bio */}
                        {!editMode && (
                          <div
                            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                              hoveredId === teacher.id ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{
                              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)',
                            }}
                          >
                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                              {/* Name */}
                              <h3 className="font-playfair text-white text-lg md:text-xl font-bold mb-1">
                                {teacher.name}
                              </h3>
                              {/* Department badge */}
                              <span
                                className="inline-block text-[9px] tracking-[0.2em] uppercase font-inter font-medium mb-3 px-2.5 py-1 rounded-md"
                                style={{
                                  color: accent,
                                  background: `${accent}1a`,
                                  border: `1px solid ${accent}30`,
                                }}
                              >
                                {departmentLabel[teacher.department]}
                              </span>
                              {/* Bio */}
                              <p className="font-inter text-white/80 text-xs md:text-sm leading-relaxed">
                                {teacher.bio}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Edit Mode: Actions */}
                        {editMode && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {editingId === teacher.id ? (
                              <div className="w-full max-w-[260px] p-4 space-y-3">
                                {teacher.src ? (
                                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white/70 text-xs cursor-pointer hover:bg-white/20 transition-colors">
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>Change Photo</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleImageUpload(teacher.id, e)}
                                    />
                                  </label>
                                ) : (
                                  <label className="flex flex-col items-center gap-2 px-4 py-5 rounded-xl bg-white/5 border border-white/10 border-dashed cursor-pointer hover:bg-white/10 transition-colors w-full">
                                    <ImagePlus className="w-6 h-6 text-white/40" />
                                    <span className="text-white/40 text-xs">Upload Photo</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleImageUpload(teacher.id, e)}
                                    />
                                  </label>
                                )}
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  placeholder="Teacher name..."
                                  className="w-full px-3 py-2 rounded-lg bg-white/10 text-white text-xs border border-white/10 focus:border-white/30 focus:outline-none"
                                />
                                <select
                                  value={editDept}
                                  onChange={(e) => setEditDept(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg bg-white/10 text-white text-xs border border-white/10 focus:border-white/30 focus:outline-none appearance-none"
                                >
                                  <option value="computer-science" className="bg-gray-900">Computer Science</option>
                                  <option value="visual-arts" className="bg-gray-900">Visual Arts</option>
                                  <option value="business" className="bg-gray-900">Business</option>
                                </select>
                                <textarea
                                  value={editBio}
                                  onChange={(e) => setEditBio(e.target.value)}
                                  placeholder="Brief biography..."
                                  rows={3}
                                  className="w-full px-3 py-2 rounded-lg bg-white/10 text-white text-xs border border-white/10 focus:border-white/30 focus:outline-none resize-none"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={handleEditSave}
                                    className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-gold/30 to-gold/10 text-gold border border-gold/30"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingId(null)}
                                    className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-white/10 text-white/60 hover:bg-white/20 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleEditStart(teacher); }}
                                  className="p-3 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-all hover:scale-110"
                                >
                                  <Edit2 className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleDelete(teacher.id); }}
                                  className="p-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all hover:scale-110"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </>
                            )}
                          </div>
                        )}

                        {/* Corner Badge (View Mode) */}
                        {!editMode && (
                          <div
                            className={`absolute top-3 left-3 w-7 h-7 rounded-lg flex items-center justify-center transition-opacity duration-300 ${
                              hoveredId === teacher.id ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{
                              background: 'rgba(255,255,255,0.08)',
                              backdropFilter: 'blur(20px)',
                              border: '1px solid rgba(255,255,255,0.1)',
                            }}
                          >
                            <User style={{ color: accent }} className="w-3 h-3" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Add Teacher Button (Edit Mode) */}
      {editMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={handleAddTeacher}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-dashed border-gold/30 text-gold/60 hover:border-gold/50 hover:text-gold hover:bg-gold/5 transition-all duration-300"
          >
            <ImagePlus className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="font-inter text-xs tracking-wider uppercase font-medium">
              Add Teacher
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
