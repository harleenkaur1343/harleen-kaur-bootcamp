//import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "../components/LoadingSpinner";
export default function Loading() {
  return (
    <>
      <div className="flex justify-center items-center py-10 w-full">
        <p className="text-gray-500 animate-pulse">Loading tasks... </p>
        <LoadingSpinner size={20} />
      </div>
       <div className="p-8">
        <div className="animate-pulse space-y-4">
          {/* Header */}
          <div className="grid grid-cols-[1fr_auto] gap-4 items-center h-12">
            <div className="h-8 bg-gray-400 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-24"></div>
          </div>
          
          {/* 5 Task skeletons */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 h-20">
              <div className="space-y-2">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
