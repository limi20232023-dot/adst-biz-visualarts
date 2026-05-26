import { motion } from 'framer-motion';
import { Code2, Palette, TrendingUp, Users } from 'lucide-react';

interface DepartmentTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'cyan' | 'gold';
  accentColor: string;
  accentGlow: string;
}

const tabs: TabConfig[] = [
  {
    id: 'computer-science',
    label: 'Computer Science',
    icon: Code2,
    color: 'cyan',
    accentColor: '#00D9FF',
    accentGlow: 'rgba(0,217,255,0.4)',
  },
  {
    id: 'visual-arts',
    label: 'Visual Arts',
    icon: Palette,
    color: 'gold',
    accentColor: '#D4AF37',
    accentGlow: 'rgba(212,175,55,0.4)',
  },
  {
    id: 'business',
    label: 'Business',
    icon: TrendingUp,
    color: 'gold',
    accentColor: '#D4AF37',
    accentGlow: 'rgba(212,175,55,0.4)',
  },
  {
    id: 'teachers',
    label: 'Teachers',
    icon: Users,
    color: 'gold',
    accentColor: '#E8A037',
    accentGlow: 'rgba(232,160,55,0.4)',
  },
];

function getCardStyle(active: boolean, accent: string): React.CSSProperties {
  const a = accent;
  return {
    background: active
      ? `linear-gradient(135deg, ${a}14, ${a}0a, rgba(255,255,255,0.03))`
      : 'rgba(255,255,255,0.02)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: active
      ? `1px solid ${a}40`
      : '1px solid rgba(255,255,255,0.06)',
    boxShadow: active
      ? `0 8px 32px ${a}18, 0 0 0 1px ${a}0d, inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.15)`
      : `0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.2)`,
  };
}

export default function DepartmentTabs({ activeTab, onTabChange }: DepartmentTabsProps) {
  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 mb-8 md:mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex justify-center"
      >
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="relative group w-full sm:w-auto min-w-[180px] md:min-w-[210px] px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/10"
              >
                {/* Crystal Card */}
                <div
                  className="relative overflow-hidden rounded-2xl transition-all duration-500"
                  style={getCardStyle(isActive, tab.accentColor)}
                >
                  {/* Top light reflection (glass facet) */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: isActive
                        ? `linear-gradient(180deg, ${tab.accentColor}0d 0%, transparent 50%)`
                        : 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 50%)',
                    }}
                  />

                  {/* Diagonal glass shard */}
                  <div
                    className="absolute -top-8 -right-8 w-24 h-24 pointer-events-none rounded-full"
                    style={{
                      background: isActive
                        ? `radial-gradient(circle, ${tab.accentColor}15, transparent 70%)`
                        : 'none',
                    }}
                  />

                  {/* Bottom prism reflection */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                    style={{
                      background: 'linear-gradient(0deg, rgba(255,255,255,0.015) 0%, transparent 100%)',
                    }}
                  />

                  {/* Shimmer on active */}
                  {isActive && (
                    <div
                      className="absolute inset-0 pointer-events-none animate-shimmer"
                      style={{
                        background: `linear-gradient(105deg, transparent 30%, ${tab.accentColor}0c 50%, transparent 70%)`,
                      }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative flex items-center gap-3.5">
                    {/* 3D Icon */}
                    <div className="relative flex-shrink-0">
                      {/* Outer glow */}
                      <div
                        className="absolute -inset-1 rounded-xl transition-opacity duration-500"
                        style={{
                          background: isActive ? tab.accentGlow : 'transparent',
                          filter: 'blur(8px)',
                          opacity: isActive ? 0.5 : 0,
                        }}
                      />
                      {/* Icon container */}
                      <div
                        className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${tab.accentColor}25, ${tab.accentColor}10)`
                            : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${isActive ? tab.accentColor + '50' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: isActive
                            ? `0 2px 12px ${tab.accentColor}30, inset 0 1px 0 rgba(255,255,255,0.12)`
                            : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                        }}
                      >
                        <span
                          className="transition-colors duration-500"
                          style={{
                            color: isActive ? tab.accentColor : 'rgba(255,255,255,0.35)',
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="text-left">
                      <span
                        className="font-montserrat text-sm md:text-[15px] font-semibold tracking-wide transition-colors duration-500"
                        style={{
                          color: isActive ? tab.accentColor : 'rgba(255,255,255,0.4)',
                        }}
                      >
                        {tab.label}
                      </span>
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="flex items-center gap-1.5 mt-1"
                        >
                          <motion.div
                            className="h-[2px] rounded-full"
                            style={{ background: tab.accentColor }}
                            initial={{ width: 0 }}
                            animate={{ width: 28 }}
                            transition={{ duration: 0.3 }}
                          />
                          <span
                            className="text-[9px] font-inter tracking-[0.15em] uppercase"
                            style={{ color: tab.accentColor + '80' }}
                          >
                            Active
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
