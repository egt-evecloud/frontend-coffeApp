import React from "react";

const Loader: React.FC = () => (
  <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 !z-[1000]">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

export default Loader;
