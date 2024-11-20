import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface FieldOption {
  value: string;
  label: string;
}

interface Field {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
}

interface Schema {
  formTitle: string;
  formDescription?: string;
  fields: Field[];
}

interface FormGeneratorProps {
  schema: Schema;
}

export const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const [darkMode, setDarkMode] = useState(false); 
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: Record<string, any>) => {
    console.log('Form Data:', data);
    alert('Form submitted successfully!');
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  if (!schema || !schema.fields || schema.fields.length === 0) {
    return <div>No fields available to generate the form.</div>;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4">
        <h1 className="text-xl font-bold mb-4">{schema.formTitle}</h1>
        <p className="text-gray-700 dark:text-gray-400 mb-6">{schema.formDescription}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {schema.fields.map((field) => (
            <div key={field.id} className="flex flex-col space-y-2">
              <label htmlFor={field.id} className="font-medium">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <Controller
                name={field.id}
                control={control}
                rules={{ required: field.required }}
                render={({ field: controllerField }) => {
                  switch (field.type) {
                    case 'text':
                    case 'email':
                      return (
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          {...controllerField}
                          className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        />
                      );
                    case 'textarea':
                      return (
                        <textarea
                          id={field.id}
                          placeholder={field.placeholder}
                          {...controllerField}
                          className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        />
                      );
                    case 'select':
                      return (
                        <select
                          id={field.id}
                          {...controllerField}
                          className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        >
                          {field.options?.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      );
                    case 'radio':
                      return (
                        <div className="flex flex-wrap gap-2">
                          {field.options?.map((option) => (
                            <label key={option.value} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                value={option.value}
                                checked={controllerField.value === option.value}
                                onChange={() => controllerField.onChange(option.value)}
                                className="dark:bg-gray-800 dark:border-gray-600"
                              />
                              {option.label}
                            </label>
                          ))}
                        </div>
                      );
                    default:
                      return <p className="text-red-500">Unsupported field type</p>;
                  }
                }}
              />
              {errors[field.id] && (
                <p className="text-red-500 text-sm">
                  {field.label} is required.
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md dark:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
