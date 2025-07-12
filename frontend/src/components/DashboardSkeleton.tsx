// src/components/DashboardSkeleton.tsx

// Um componente pequeno para um card de esqueleto
const SkeletonCard = () => (
  <div className="h-36 rounded-lg bg-zinc-800 animate-pulse" />
);

export function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-[rgb(var(--background-start-rgb))] text-[rgb(var(--foreground-rgb))] overflow-hidden">
      
      {/* Sidebar Esquerda Esqueleto */}
      <aside className="w-1/6 p-4 bg-[rgb(var(--surface-rgb))] border-r border-[rgb(var(--border-rgb))]">
        <div className="w-3/4 h-8 mb-4 rounded bg-zinc-700 animate-pulse" />
        <div className="space-y-3">
          <div className="h-24 rounded-lg bg-zinc-800 animate-pulse" />
          <div className="h-24 rounded-lg bg-zinc-800 animate-pulse" />
          <div className="h-24 rounded-lg bg-zinc-800 animate-pulse" />
        </div>
      </aside>

      {/* Conteúdo Principal Esqueleto */}
      <main className="flex-1 p-6">
        <div className="p-6">
          <header className="mb-6">
            <div className="h-10 w-1/2 rounded bg-zinc-700 animate-pulse" />
            <div className="h-4 w-1/3 mt-2 rounded bg-zinc-700 animate-pulse" />
          </header>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </main>

      {/* Sidebar Direita Esqueleto */}
      <aside className="w-1/6 p-4 bg-[rgb(var(--surface-rgb))] border-l border-[rgb(var(--border-rgb))]">
        <div className="w-3/4 h-8 mb-4 rounded bg-zinc-700 animate-pulse" />
        <div className="h-4 w-full rounded bg-zinc-800 animate-pulse" />
      </aside>
    </div>
  );
}