import { useState } from "react";

export default function useLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return { formData };
}
