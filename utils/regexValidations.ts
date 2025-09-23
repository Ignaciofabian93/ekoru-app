export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Password must be at least 8 characters long and contain a number
  const passwordRegex = /^(?=.*[0-9]).{8,}$/;
  return passwordRegex.test(password);
};
