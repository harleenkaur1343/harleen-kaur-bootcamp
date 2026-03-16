import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "../components/LoadingSpinner";
export default function Loading() {
  return (
    <div className="flex justify-center items-center py-10">
      <p className="text-gray-500 animate-pulse">Loading tasks... </p>
      <LoadingSpinner size={20}/>
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  );
}
