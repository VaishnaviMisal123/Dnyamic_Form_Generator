import React from "react";
import { ClipboardIcon } from '@heroicons/react/24/outline';

const CopyButton: React.FC<{ json: string }> = ({ json }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(json);
    alert("JSON copied to clipboard!");
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
    >
      <ClipboardIcon className="h-5 w-5 inline mr-2" />
      Copy JSON
    </button>
  );
};

export default CopyButton;
