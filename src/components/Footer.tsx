export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto text-center">
      {/* Spacing separator */}
      <div className="max-w-4xl mx-auto px-4 pt-16 md:pt-24">
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <p className="font-inter text-gold text-[10px] md:text-[11px] tracking-[0.2em] uppercase" style={{ opacity: 0.6 }}>
          © Mr.T 2026 — MLIA-SZ-ADST BiZ Visual Arts Exhibition — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
