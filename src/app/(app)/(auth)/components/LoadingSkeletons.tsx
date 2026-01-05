import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonProps {
  text?: string;
}

export function PlanSelectionSkeleton({
  text = "Loading plans...",
}: SkeletonProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-5xl space-y-8 animate-in fade-in duration-700 opacity-50">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center space-y-4 mb-12">
          <Skeleton className="h-10 w-64 md:w-96 rounded-lg bg-gray-200/50" />
          <Skeleton className="h-6 w-48 md:w-64 rounded-lg bg-gray-200/30" />
        </div>

        {/* Pricing Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-gray-200/20 bg-gray-200/10 p-6 md:p-8 space-y-6 h-[400px]"
            >
              <div className="space-y-3">
                <Skeleton className="h-8 w-32 bg-gray-200/30" />
                <Skeleton className="h-4 w-48 bg-gray-200/20" />
              </div>
              <Skeleton className="h-12 w-24 bg-gray-200/40" />
              <div className="space-y-3 pt-4">
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} className="h-4 w-full bg-gray-200/20" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading Text - Centered & Black */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm">
          <div className="h-8 w-8 border-3 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
          <p className="font-semibold text-lg md:text-xl animate-pulse tracking-wide text-gray-900">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProjectFormSkeleton({ text = "Loading..." }: SkeletonProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative">
      <div className="w-full max-w-xl animate-in fade-in duration-700 space-y-6 opacity-50">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 p-8">
          {/* Card Header */}
          <div className="space-y-4 mb-8">
            <Skeleton className="h-8 w-48 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-64 bg-gray-100 dark:bg-gray-800" />
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-800" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-32 w-full bg-gray-100 dark:bg-gray-800" />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Skeleton className="h-10 w-24 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-32 bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading Indicator - Centered & Black */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm">
          <div className="relative">
            <div className="absolute inset-0 h-12 w-12 rounded-full bg-indigo-500/10 blur-xl animate-pulse" />
            <div className="h-10 w-10 border-3 border-gray-900/30 border-t-gray-900 rounded-full animate-spin relative z-10" />
          </div>
          <p className="text-xl md:text-2xl font-semibold tracking-wide animate-pulse text-gray-900 drop-shadow-sm">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
