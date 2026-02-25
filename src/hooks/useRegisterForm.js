import { useState } from "react";

export const useRegisterForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const value =
      field === "acceptDataProcessing"
        ? event.target.checked
        : event.target.value;

    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => setFormData(initialState);

  return { formData, handleChange, errors, setErrors, resetForm };
};
