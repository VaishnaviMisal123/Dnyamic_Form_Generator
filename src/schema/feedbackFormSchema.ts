import { Schema } from '../types';

export const feedbackFormSchema: Schema = {
  formTitle: "User Feedback Form",
  formDescription: "We value your feedback. Please fill out the form below.",
  fields: [
    { id: "name", type: "text", label: "Name", placeholder: "Enter your name", required: true },
    { id: "email", type: "email", label: "Email", placeholder: "Enter your email", required: true },
    { id: "feedback", type: "textarea", label: "Feedback", placeholder: "Share your feedback" },
    {
      id: "rating",
      type: "radio",
      label: "Rating",
      options: [
        { value: "1", label: "1 Star" },
        { value: "2", label: "2 Stars" },
        { value: "3", label: "3 Stars" },
        { value: "4", label: "4 Stars" },
        { value: "5", label: "5 Stars" },
      ],
    },
    {
      id: "country",
      type: "select",
      label: "Country",
      options: [
        { value: "usa", label: "United States" },
        { value: "india", label: "India" },
        { value: "australia", label: "Australia" },
      ],
    },
  ],
}; 