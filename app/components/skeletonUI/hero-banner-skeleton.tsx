export default function HeroBannerSkeleton() {
  return (
    <div className="flex min-h-130 w-full animate-pulse flex-col-reverse items-center justify-between gap-8 rounded-md bg-gray-100 px-5 py-8 md:min-h-90 md:flex-row md:px-12 md:py-10">

      {/* Left Content */}
      <div className="flex w-full flex-col items-center md:w-1/2 md:items-start">

        {/* Icon + Title */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200" />

          <div className="h-6 w-40 rounded-md bg-gray-200" />
        </div>

        {/* Subtitle */}
        <div className="mb-4 h-5 w-56 rounded-md bg-gray-200" />

        {/* Offer */}
        <div className="mb-6 space-y-3">
          <div className="h-12 w-72 rounded-md bg-gray-200" />
          <div className="h-12 w-48 rounded-md bg-gray-200" />
        </div>

        {/* Button */}
        <div className="h-6 w-28 rounded-md bg-gray-200" />

      </div>

      {/* Right Image */}
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="h-55 w-55 rounded-2xl bg-gray-200 sm:h-65 sm:w-65 md:h-75 md:w-75" />
      </div>

    </div>
  );
}