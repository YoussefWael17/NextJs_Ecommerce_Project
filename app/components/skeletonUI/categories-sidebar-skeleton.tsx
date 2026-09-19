export default function CategorySideBarSkeleton() {
  return (
    <>
        {Array.from({ length: 6 }).map((_, index) => (
            <div
                key={index}
                className={`h-4 animate-pulse rounded bg-gray-200 ${
                index % 2 === 0 ? "w-36" : "w-28"
                }`}
            />
        ))}
    </>
  )
}



