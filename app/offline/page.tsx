export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="max-w-md rounded-[32px] border border-shell-line bg-white p-8 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-shell-mute">Classic SRS Speaking</p>
        <h1 className="mt-3 font-serif-display text-3xl text-shell-ink">Offline</h1>
        <p className="mt-4 text-sm leading-7 text-shell-mute">Aplikacja nie ma teraz sieci. Po wczesniejszym zaladowaniu najwazniejsze ekrany PWA powinny dalej dzialac lokalnie.</p>
      </div>
    </main>
  );
}
