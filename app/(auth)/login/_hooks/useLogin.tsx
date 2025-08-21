import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/app/api/auth/auth";
import useAlert from "@/hooks/useAlert";

export default function useLogin() {
  const router = useRouter();
  const { notify, notifyError } = useAlert();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      notifyError("Todos los campos son obligatorios.");
      return;
    }
    setIsLoading(true);
    const response = await Login({ email, password });
    console.log("response:: ", response);
    if (response && response.token) {
      notify("Inicio de sesión exitoso.");
      router.replace("/feed");
      setIsLoading(false);
      return;
    } else {
      notifyError("Error al iniciar sesión. Verifica tus credenciales.");
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    showPassword,
    handleFormData,
    handleSubmit,
    togglePasswordVisibility,
  };
}
