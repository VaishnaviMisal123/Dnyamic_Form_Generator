import React, { useState } from "react";
import JSONEditor from "react-json-editor-ajrm"; 
import "react-json-editor-ajrm/es/styles/theme-default.css"; 

interface JsonEditorProps {
  onChange: (json: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onChange }) => {
  const [jsonValue, setJsonValue] = useState<string>("");

  const handleChange = (value: any) => {
    setJsonValue(value.json);
    onChange(JSON.stringify(value.json, null, 2));
  };

  return (
    <div className="json-editor-container">
      <JSONEditor
        placeholder={{}} 
        onChange={handleChange}
        value={jsonValue}
        theme="light" 
      />
    </div>
  );
};

export default JsonEditor;
