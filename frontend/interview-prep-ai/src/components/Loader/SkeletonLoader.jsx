
const SkeletonLoader = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="h-3 bg-gray-100 rounded-full w-1/4"></div>
        <div className="h-3 bg-gray-100 rounded-full w-10"></div>
      </div>

      {/* Main Content Blocks */}
      <div className="space-y-3">
        {/* Title */}
        <div className="h-3.5 bg-gray-100 rounded-full w-3/4"></div>

        {/* Paragraph Lines */}
        <div className="space-y-2">
          <div className="h-2.5 bg-gray-100 rounded-full w-full"></div>
          <div className="h-2.5 bg-gray-100 rounded-full w-11/12"></div>
          <div className="h-2.5 bg-gray-100 rounded-full w-10/12"></div>
          <div className="h-2.5 bg-gray-100 rounded-full w-9/12"></div>
        </div>

        {/* Spacer */}
        <div className="h-4"></div>

        {/* Secondary Title */}
        <div className="h-3 bg-gray-100 rounded-full w-1/2"></div>

        {/* Bullet Points */}
        <div className="space-y-2 pl-4">
          <div className="h-2.5 bg-gray-100 rounded-full w-4/5"></div>
          <div className="h-2.5 bg-gray-100 rounded-full w-3/5"></div>
          <div className="h-2.5 bg-gray-100 rounded-full w-2/3"></div>
        </div>
      </div>

      {/* Card Section */}
      <div className="bg-gray-50 rounded-lg p-3 space-y-2.5 mt-4">
        <div className="h-2.5 bg-gray-100 rounded-full w-1/3"></div>
        <div className="h-2.5 bg-gray-100 rounded-full w-full"></div>
        <div className="h-2.5 bg-gray-100 rounded-full w-5/6"></div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-end space-x-3 pt-2">
        <div className="h-3 bg-gray-100 rounded-full w-16"></div>
        <div className="h-3 bg-gray-100 rounded-full w-16"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;