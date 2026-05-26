import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, ImagePlus, Upload, Camera } from 'lucide-react';
import type { GalleryImage } from '../data/departments';

interface GalleryProps {
  departmentId: string;
  departmentName: string;
  images: GalleryImage[];
  editMode: boolean;
  color: 'gold' | 'cyan' | 'purple';
  onUpdateImages: (images: GalleryImage[]) => void;
  onOpenLightbox: (image: GalleryImage, index: number) => void;
}

export default function ImageGallery({
  departmentId,
  departmentName,
  images,
  editMode,
  color,
  onUpdateImages,
  onOpenLightbox,
}: GalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const accentColor = color === 'cyan' ? 'cyan' : 'gold';
  const accentClass = accentColor === 'cyan'
    ? { text: 'text-cyan', border: 'border-cyan/30', bg: 'bg-cyan/10', ring: 'ring-cyan/30' }
    : { text: 'text-gold', border: 'border-gold/30', bg: 'bg-gold/10', ring: 'ring-gold/30' };

  const handleEditStart = (img: GalleryImage) => {
    setEditingId(img.id);
    setEditCaption(img.caption);
    setEditCategory(img.category);
  };

  const handleEditSave = () => {
    if (editingId) {
      onUpdateImages(
        images.map((img) =>
          img.id === editingId ? { ...img, caption: editCaption, category: editCategory } : img
        )
      );
      setEditingId(null);
    }
  };

  const handleDelete = (id: string) => {
    onUpdateImages(images.filter((img) => img.id !== id));
  };

  const handleAddImage = () => {
    const newId = `${departmentId}-${Date.now()}`;
    const newImage: GalleryImage = {
      id: newId,
      src: '',
      caption: 'New image - click to edit',
      category: 'General',
    };
    onUpdateImages([...images, newImage]);
    setTimeout(() => handleEditStart(newImage), 100);
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onUpdateImages(
          images.map((img) =>
            img.id === id ? { ...img, src: ev.target?.result as string } : img
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
      {/* Department Info */}
      <motion.div
        key={departmentId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className={`font-playfair text-2xl md:text-4xl font-bold mb-3 ${accentColor === 'cyan' ? 'text-gradient-cyan' : 'text-gradient-gold'}`}>
          {departmentName}
        </h2>
        <div className={`w-16 h-[2px] mx-auto mb-4 ${accentColor === 'cyan' ? 'bg-gradient-to-r from-transparent via-cyan to-transparent' : 'bg-gradient-to-r from-transparent via-gold to-transparent'}`} />
        <p className="font-inter text-white/40 text-sm max-w-md mx-auto leading-relaxed">
          {images.length} Exhibition Pieces
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        key={departmentId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(img.id)}
              onMouseLeave={() => {
                setHoveredId(null);
                if (!editMode) setEditingId(null);
              }}
              onClick={() => {
                if (!editMode && img.src) {
                  onOpenLightbox(img, index);
                }
              }}
            >
              {/* Image */}
              {img.src ? (
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (img.fallbackSrc && !target.src.includes(img.fallbackSrc)) {
                      target.src = img.fallbackSrc;
                    }
                  }}
                />
              ) : (
                <div className={`w-full h-full flex flex-col items-center justify-center ${accentColor === 'cyan' ? 'bg-gradient-to-br from-cyan/10 to-noir-card' : 'bg-gradient-to-br from-gold/10 to-noir-card'}`}>
                  <Camera className={`w-10 h-10 mb-3 ${accentClass.text} opacity-40`} />
                  <span className="font-inter text-white/20 text-xs tracking-wider uppercase">
                    {img.category} — {index + 1}
                  </span>
                </div>
              )}

              {/* View Mode: Hover Overlay with Caption */}
              {!editMode && (
                <div
                  className={`absolute inset-0 pointer-events-none gallery-overlay transition-opacity duration-500 ${
                    hoveredId === img.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <span className={`inline-block text-[10px] tracking-[0.2em] uppercase font-inter font-medium mb-2 px-2 py-1 rounded-md ${
                      accentColor === 'cyan'
                        ? 'bg-cyan/20 text-cyan'
                        : 'bg-gold/20 text-gold'
                    }`}>
                      {img.category}
                    </span>
                    <h3 className="font-playfair text-white text-sm md:text-base font-semibold leading-snug">
                      {img.caption}
                    </h3>
                  </div>
                </div>
              )}

              {/* Edit Mode: Actions */}
              {editMode && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {editingId === img.id ? (
                    <div className="w-full max-w-[280px] p-4 space-y-3">
                      {img.src ? (
                        <>
                          <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white/70 text-xs cursor-pointer hover:bg-white/20 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Change Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(img.id, e)}
                            />
                          </label>
                          <input
                            type="text"
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                            placeholder="Caption..."
                            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white text-xs border border-white/10 focus:border-white/30 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            placeholder="Category..."
                            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white text-xs border border-white/10 focus:border-white/30 focus:outline-none"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleEditSave}
                              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-gradient-to-r ${
                                accentColor === 'cyan'
                                  ? 'from-cyan/30 to-cyan/10 text-cyan border border-cyan/30'
                                  : 'from-gold/30 to-gold/10 text-gold border border-gold/30'
                              }`}
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
                        </>
                      ) : (
                        <>
                          <label className="flex flex-col items-center gap-2 px-4 py-6 rounded-xl bg-white/5 border border-white/10 border-dashed cursor-pointer hover:bg-white/10 transition-colors w-full">
                            <ImagePlus className="w-6 h-6 text-white/40" />
                            <span className="text-white/40 text-xs">Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(img.id, e)}
                            />
                          </label>
                          <input
                            type="text"
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                            placeholder="Caption..."
                            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white text-xs border border-white/10 focus:border-white/30 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            placeholder="Category..."
                            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white text-xs border border-white/10 focus:border-white/30 focus:outline-none"
                          />
                          <button
                            onClick={handleEditSave}
                            className={`w-full px-3 py-2 rounded-lg text-xs font-medium bg-gradient-to-r ${
                              accentColor === 'cyan'
                                ? 'from-cyan/30 to-cyan/10 text-cyan border border-cyan/30'
                                : 'from-gold/30 to-gold/10 text-gold border border-gold/30'
                            }`}
                          >
                            Save
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEditStart(img); }}
                        className="p-3 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-all hover:scale-110"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }}
                        className="p-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all hover:scale-110"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Corner Number Badge */}
              {!editMode && (
                <div className={`absolute top-3 left-3 w-7 h-7 rounded-lg glass flex items-center justify-center ${hoveredId === img.id ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  <span className={`text-[10px] font-bold ${accentClass.text}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Add Image Button (Edit Mode) */}
      {editMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={handleAddImage}
            className={`group flex items-center gap-2 px-6 py-3 rounded-xl border border-dashed transition-all duration-300 ${
              accentColor === 'cyan'
                ? 'border-cyan/30 text-cyan/60 hover:border-cyan/50 hover:text-cyan hover:bg-cyan/5'
                : 'border-gold/30 text-gold/60 hover:border-gold/50 hover:text-gold hover:bg-gold/5'
            }`}
          >
            <ImagePlus className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="font-inter text-xs tracking-wider uppercase font-medium">
              Add Exhibition Piece
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
