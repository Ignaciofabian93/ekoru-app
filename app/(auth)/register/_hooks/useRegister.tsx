import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_PERSON, REGISTER_STORE } from "@/graphql/session/mutations";
import { type SellerType } from "@/types/enums";
import useAlert from "@/hooks/useAlert";

type RegisterPerson = {
  firstName: string;
  lastName?: string; // Optional for PERSON type
  email: string;
  password: string;
  confirmPassword: string;
  sellerType: SellerType;
};

export default function useRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterPerson>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    sellerType: "PERSON",
  });
  const { notifyError, notify } = useAlert();
  const [RegisterPerson, { loading: registerPersonLoading }] = useMutation(
    REGISTER_PERSON,
    {
      onError: () => {
        notifyError("Error al registrarse. Por favor, inténtalo de nuevo.");
      },
      onCompleted: ({ registerPerson }) => {
        notify(
          `Gracias por registrarte ${registerPerson.firstName}!. Ahora podrás iniciar sesión con tu correo y contraseña.`
        );
      },
    }
  );
  const [RegisterStore, { loading: registerStoreLoading }] = useMutation(
    REGISTER_STORE,
    {
      onError: (error) => {
        console.error("Registration error:", error);
      },
      onCompleted: (data) => {
        console.log("Registration successful:", data);
      },
    }
  );

  const handleAccountTypeChange = (e: SellerType) => {
    setFormData((prev) => ({
      ...prev,
      sellerType: e,
    }));
  };

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      sellerType,
    } = formData;
    if (!email || !password || !confirmPassword || !firstName) {
      notifyError("Todos los campos son obligatorios.");
      return;
    }
    if (password !== confirmPassword) {
      notifyError("Las contraseñas no coinciden.");
      return;
    }
    if (sellerType === "PERSON") {
      RegisterPerson({
        variables: { input: { firstName, lastName, email, password } },
      });
    } else {
      RegisterStore({ variables: { input: { email, password } } });
    }
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    registerPersonLoading,
    registerStoreLoading,
    handleFormData,
    handleAccountTypeChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSubmit,
  };
}
