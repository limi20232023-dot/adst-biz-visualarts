import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, User } from 'lucide-react';
import type { Teacher } from '../data/departments';

interface TeacherLightboxProps {
  teacher: Teacher | null;
  teachers: Teacher[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const departmentAccent: Record<string, string> = {
  'computer-science': '#00D9FF',
  'visual-arts': '#D4AF37',
  'business': '#D4AF37',
};

const departmentLabel: Record<string, string> = {
  'computer-science': 'Computer Science',
  'visual-arts': 'Visual Arts',
  'business': 'Business',
};

export default function TeacherLightbox({ teacher, teachers, index, onClose, onNavigate }: TeacherLightboxProps) {
  if (!teacher) return null;

  const accent = departmentAccent[teacher.department] || '#D4AF37';

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((index + 1) % teachers.length);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((index - 1 + teachers.length) % teachers.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 md:p-3 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={goPrev}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {teacher.src ? (
            <img
              src={teacher.src}
              alt={teacher.name}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl shadow-black/50"
              style={{ aspectRatio: '3/4', maxHeight: '60vh' }}
              onError={(e) => {
                const target = e.currentTarget;
                if (teacher.fallbackSrc && !target.src.includes(teacher.fallbackSrc)) {
                  target.src = teacher.fallbackSrc;
                }
              }}
            />
          ) : (
            <div
              className="w-64 h-80 rounded-lg flex flex-col items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${accent}15, rgba(26,26,26,0.9))` }}
            >
              <User className="w-16 h-16 mb-4 opacity-40" style={{ color: accent }} />
              <span className="font-playfair text-white/30 text-lg">{teacher.name}</span>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-center px-6"
          >
            <h3 className="font-playfair text-white text-xl md:text-2xl font-bold mb-2">
              {teacher.name}
            </h3>
            <span
              className="inline-block text-[10px] tracking-[0.2em] uppercase font-inter font-medium mb-3 px-3 py-1 rounded-md"
              style={{
                color: accent,
                background: `${accent}1a`,
                border: `1px solid ${accent}30`,
              }}
            >
              {departmentLabel[teacher.department]}
            </span>
            <p className="font-inter text-white/60 text-sm md:text-base max-w-md leading-relaxed">
              {teacher.bio}
            </p>
          </motion.div>

          <div className="mt-3 text-white/30 text-xs font-inter tracking-wider">
            {index + 1} / {teachers.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
