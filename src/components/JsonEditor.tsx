import React, { useState } from 'react';

interface JsonEditorProps {
  onChange: (json: string) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ onChange }) => {
  const [json, setJson] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJson(value);
    try {
      const parsed = JSON.parse(value);
      onChange(parsed);
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <textarea
        className="p-4 border border-gray-300 rounded-md w-full h-64"
        value={json}
        onChange={handleInputChange}
        placeholder="Paste your JSON schema here..."
      />
      {(() => {
        try {
          JSON.parse(json);
          return <p className="text-green-500">JSON is valid</p>;
        } catch {
          return <p className="text-red-500">Invalid JSON</p>;
        }
      })()}
    </div>
  );
};
