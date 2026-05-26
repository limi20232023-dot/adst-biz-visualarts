import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '../data/departments';

interface LightboxProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ image, images, index, onClose, onNavigate }: LightboxProps) {
  if (!image) return null;

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((index + 1) % images.length);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((index - 1 + images.length) % images.length);
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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 md:p-3 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Navigation */}
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

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.src}
            alt={image.caption}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl shadow-black/50"
            onError={(e) => {
              const target = e.currentTarget;
              if (image.fallbackSrc && !target.src.includes(image.fallbackSrc)) {
                target.src = image.fallbackSrc;
              }
            }}
          />

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-center px-6"
          >
            <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-inter font-medium mb-2 px-3 py-1 rounded-md bg-gold/20 text-gold">
              {image.category}
            </span>
            <h3 className="font-playfair text-white text-lg md:text-xl font-semibold max-w-md">
              {image.caption}
            </h3>
          </motion.div>

          {/* Counter */}
          <div className="mt-3 text-white/30 text-xs font-inter tracking-wider">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
