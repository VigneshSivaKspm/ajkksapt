export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-surface-900 bg-grid flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-surface-600" />
          <div className="absolute inset-0 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        </div>
        <p className="font-mono text-xs text-surface-400 tracking-widest uppercase animate-pulse-soft">
          Initialising System
        </p>
      </div>
    </div>
  );
}
