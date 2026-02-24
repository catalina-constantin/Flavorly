export const validateRegisterForm = (formData) => {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required*";
  }

  if (!formData.email.includes("@")) {
    errors.email = "Please enter a valid email.";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
  if (!passwordRegex.test(formData.password)) {
    errors.password =
      "Password needs 6+ chars, uppercase, number, and special char.";
  }

  if (formData.password !== formData.repeatPassword) {
    errors.repeatPassword = "Passwords do not match.";
  }

  if (!formData.acceptDataProcessing) {
    errors.acceptDataProcessing = "Agreement required*";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
