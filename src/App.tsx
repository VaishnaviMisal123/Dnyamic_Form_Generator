import React, { useState } from "react";
import { JsonEditor } from './components/JsonEditor'; 
import { FormGenerator } from './components/FormGenerator'; 
import CopyButton from "./components/CopyButton"; 
import { feedbackFormSchema } from './schema/feedbackFormSchema'; 

const App: React.FC = () => {
  const [schema, setSchema] = useState<any>(feedbackFormSchema); 
  const [darkMode, setDarkMode] = useState(false); 
  const [jsonError, setJsonError] = useState<string | null>(null); 

  const handleJsonSchemaChange = (json: any) => {
    try {
      const parsedJson = JSON.parse(json); 
      setSchema(parsedJson);
      setJsonError(null); 
    } catch (error) {
      setJsonError("Invalid JSON format."); 
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen transition-all`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-800 text-white p-2 rounded-md fixed top-4 right-4 z-10"
      >
        Toggle Dark Mode
      </button>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold">Dynamic Form Generator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg">
            <h2 className="text-xl font-semibold mb-4">JSON Editor</h2>
            <div className="mb-4">
              <textarea
                placeholder="Paste your JSON schema here..."
                className="w-full h-64 p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                onChange={(e) => handleJsonSchemaChange(e.target.value)}
                defaultValue={JSON.stringify(schema, null, 2)}
              />
            </div>
            {jsonError && <p className="text-red-500 text-sm">{jsonError}</p>}
            <CopyButton json={JSON.stringify(schema, null, 2)} />
          </div>

          {/* Right Section: Form Preview */}
          <div className="p-4 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Form Preview</h2>
            {schema ? (
              <FormGenerator schema={schema} />
            ) : (
              <p className="text-gray-500">No schema selected or invalid JSON.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
