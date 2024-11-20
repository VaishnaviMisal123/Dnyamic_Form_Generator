import React from "react";

const FormPreview = ({ schema }: { schema: any }) => {
  if (!schema.fields || schema.fields.length === 0) {
    return <div>No fields available to generate the form.</div>;
  }

  return (
    <form>
      {schema.fields.map((field: any) => {
        switch (field.type) {
          case "text":
          case "email":
            return (
              <div key={field.id}>
                <label>{field.label}</label>
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            );
          case "textarea":
            return (
              <div key={field.id}>
                <label>{field.label}</label>
                <textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            );
          case "radio":
            return (
              <div key={field.id}>
                <label>{field.label}</label>
                {field.options.map((option: any) => (
                  <div key={option.value}>
                    <input
                      type="radio"
                      name={field.id}
                      value={option.value}
                      id={option.value}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                  </div>
                ))}
              </div>
            );
          case "select":
            return (
              <div key={field.id}>
                <label>{field.label}</label>
                <select id={field.id} required={field.required}>
                  {field.options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          default:
            return null;
        }
      })}
    </form>
  );
};

export default FormPreview;
