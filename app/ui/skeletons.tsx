// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export function CriticismCardSkeleton() {
  return (
      <div className={`${shimmer} relative overflow-hidden rounded-lg bg-gray-100 p-4 shadow-md`}>
          <div className="relative h-48 w-full bg-gray-200" />
          <div className="p-4 h-52">
              <div className="h-6 w-3/4 mb-2 rounded-md bg-gray-200" />
              <div className="space-y-2">
                  <div className="h-4 w-full rounded-md bg-gray-200" />
                  <div className="h-4 w-full rounded-md bg-gray-200" />
                  <div className="h-4 w-full rounded-md bg-gray-200" />
                  <div className="h-4 w-full rounded-md bg-gray-200" />
                  <div className="h-4 w-3/4 rounded-md bg-gray-200" />
              </div>
          </div>
      </div>
  );
}

export function CriticismCardsSkeleton() {
  return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CriticismCardSkeleton />
          <CriticismCardSkeleton />
          <CriticismCardSkeleton />
          <CriticismCardSkeleton />
      </div>
  );
}


export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CriticismCardSkeleton />
        <CriticismCardSkeleton />
        <CriticismCardSkeleton />
        <CriticismCardSkeleton />
        <CriticismCardSkeleton />
        <CriticismCardSkeleton />
        <CriticismCardSkeleton />
        <CriticismCardSkeleton />
      </div>
    </>
  );
}
