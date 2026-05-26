import { useEffect, useState, useRef } from 'react';
import { Camera, Sparkles, Eye, EyeOff, Check, Pencil } from 'lucide-react';

interface HeaderProps {
  editMode: boolean;
  onToggleEdit: () => void;
  title: string;
  onTitleChange: (title: string) => void;
}

export default function Header({ editMode, onToggleEdit, title, onTitleChange }: HeaderProps) {
  const [visible, setVisible] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Sync draft when external title changes
  useEffect(() => {
    setTitleDraft(title);
  }, [title]);

  // Focus input when entering title edit mode
  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleTitleSave = () => {
    const trimmed = titleDraft.trim();
    if (trimmed && trimmed !== title) {
      onTitleChange(trimmed);
    } else {
      setTitleDraft(title);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setTitleDraft(title);
      setIsEditingTitle(false);
    }
  };

  return (
    <header
      className={`relative z-10 pt-8 pb-4 md:pt-14 md:pb-8 px-4 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20">
                <Camera className="w-5 h-5 md:w-6 md:h-6 text-noir-bg" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gold/20 blur-lg -z-10 animate-pulse" />
            </div>
          </div>

          <button
            onClick={onToggleEdit}
            className={`group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-inter tracking-wider uppercase transition-all duration-300 ${
              editMode
                ? 'bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white/80 hover:border-white/20'
            }`}
          >
            {editMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {editMode ? 'Exit Edit' : 'Edit Mode'}
          </button>
        </div>

        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="line-glow flex-1 max-w-[120px]" />
            <Sparkles className="w-4 h-4 text-gold/60" />
            <div className="line-glow flex-1 max-w-[120px]" />
          </div>

          {/* Editable Title */}
          <div className="relative inline-block">
            <h1 className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
              <span className="text-gold">{title}</span>
            </h1>

            {/* Edit Mode: Inline Editing */}
            {editMode && (
              <div className="mt-1">
                {isEditingTitle ? (
                  <div className="flex flex-col items-center gap-2 animate-fade-in-up">
                    <input
                      ref={inputRef}
                      type="text"
                      value={titleDraft}
                      onChange={(e) => setTitleDraft(e.target.value)}
                      onKeyDown={handleTitleKeyDown}
                      onBlur={handleTitleSave}
                      placeholder="Enter academy name..."
                      className="w-full max-w-lg px-4 py-2.5 rounded-xl bg-noir-card border-2 border-gold/40 text-gold font-playfair text-lg md:text-2xl font-bold text-center focus:outline-none focus:border-gold/60 placeholder:text-white/20"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleTitleSave}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gold/20 border border-gold/30 text-gold text-xs font-inter tracking-wider uppercase hover:bg-gold/30 transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Save
                      </button>
                      <button
                        onClick={() => { setTitleDraft(title); setIsEditingTitle(false); }}
                        className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-inter tracking-wider uppercase hover:bg-white/10 hover:text-white/70 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                    <p className="text-white/25 text-[10px] font-inter tracking-wider">
                      Press Enter to save · Escape to cancel
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditingTitle(true)}
                    className="group/edit flex items-center gap-2 mx-auto px-4 py-1.5 rounded-lg border border-dashed border-gold/20 text-gold/50 hover:border-gold/40 hover:text-gold transition-all"
                  >
                    <Pencil className="w-3 h-3" />
                    <span className="text-[10px] font-inter tracking-[0.15em] uppercase">
                      Edit Title
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-3" />

          <p className="font-playfair text-xl md:text-3xl text-gold/90 font-semibold tracking-wide">
            Shenzhen
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6">
          {['Computer Science', 'Visual Arts', 'Business'].map((dept) => (
            <span
              key={dept}
              className="font-inter text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/30"
            >
              {dept}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
