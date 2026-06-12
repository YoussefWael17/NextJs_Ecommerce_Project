export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      
      {/* image */}
      <div className="h-48 w-full rounded bg-gray-200" />

      {/* title */}
      <div className="h-4 w-3/4 rounded bg-gray-200" />

      {/* price */}
      <div className="h-4 w-1/2 rounded bg-gray-200" />

      {/* buttons */}
      <div className="flex gap-2">
        <div className="h-8 w-8 rounded bg-gray-200" />
        <div className="h-8 w-8 rounded bg-gray-200" />
        <div className="h-8 w-8 rounded bg-gray-200" />
      </div>
      
    </div>
  );
}