import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/app/api/auth/auth";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "@/graphql/session/queries";
import useSessionStore from "@/store/session";
import useAlert from "@/hooks/useAlert";
import { sanitizeEmailInput } from "@/security/sanitizeInputs";

export default function useLogin() {
  const router = useRouter();
  const { notify, notifyError } = useAlert();
  const { handleSession } = useSessionStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [GetMe, { loading: userLoading }] = useLazyQuery(GET_ME);

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Apply appropriate sanitization based on input type
    if (name === "email") {
      sanitizedValue = sanitizeEmailInput(value);
    }
    // Don't sanitize password as it might need special characters

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
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

    // Final sanitization before submission
    const sanitizedEmail = sanitizeEmailInput(email);

    setIsLoading(true);
    const response = await Login({ email: sanitizedEmail, password }); // Don't sanitize password
    if (response && response.token) {
      const { data: userData } = await GetMe();
      console.log("response", response);
      console.log("userData", userData);

      if (!userLoading && userData.me?.id) {
        handleSession(userData.me);
        notify("Inicio de sesión exitoso.");
        router.replace("/feed");
        setIsLoading(false);
        return;
      } else {
        notifyError("Error al obtener los datos del usuario.");
        setIsLoading(false);
        return;
      }
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
