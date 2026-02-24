export const validatePasswordFields = (
  formData,
  confirmFieldName = "repeatPassword",
) => {
  const errors = {};

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
  if (!passwordRegex.test(formData.password)) {
    errors.password =
      "Password needs 6+ chars, uppercase, number, and special char.";
  }

  if (formData.password !== formData[confirmFieldName]) {
    errors[confirmFieldName] = "Passwords do not match.";
  }

  return errors;
};

export const validateRegisterForm = (formData) => {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required*";
  }

  if (!formData.email.includes("@")) {
    errors.email = "Please enter a valid email.";
  }

  Object.assign(errors, validatePasswordFields(formData, "repeatPassword"));

  if (!formData.acceptDataProcessing) {
    errors.acceptDataProcessing = "Agreement required*";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
