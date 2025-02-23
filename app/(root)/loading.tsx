import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[calc(100vh-76px)] bg-primary-light padding_section padding_content space-y-12 flex relative">
      <div className="h-10 w-10 border-4 border-gray-300 border-t-secondary rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
