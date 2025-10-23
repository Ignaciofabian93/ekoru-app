import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_PERSON, REGISTER_BUSINESS } from "@/graphql/session/mutations";
import { type BusinessType, type SellerType } from "@/types/enums";
import useAlert from "@/hooks/useAlert";
import { useRouter } from "next/navigation";
import { sanitizeNameInput, sanitizeEmailInput, sanitizeTextInput } from "@/security/sanitizeInputs";

export type RegisterPerson = {
  firstName: string;
  lastName?: string; // Optional for PERSON type
  email: string;
  password: string;
  confirmPassword: string;
  sellerType: SellerType;
};

export type RegisterBusiness = {
  businessType: BusinessType;
  sellerType: SellerType;
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function useRegister() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterPerson | RegisterBusiness>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    sellerType: "PERSON",
    businessType: "MIXED",
    businessName: "",
  });
  const { notifyError, notify } = useAlert();
  const [RegisterPerson, { loading: registerPersonLoading }] = useMutation(REGISTER_PERSON, {
    onError: () => {
      notifyError("Error al registrarse. Por favor, inténtalo de nuevo.");
    },
    onCompleted: () => {
      notify(`Gracias por registrarte!. Ahora podrás iniciar sesión con tu correo y contraseña.`);
      redirectToLogin();
    },
  });
  const [RegisterBusiness, { loading: registerBusinessLoading }] = useMutation(REGISTER_BUSINESS, {
    onError: () => {
      notifyError("Error al registrarse. Por favor, inténtalo de nuevo.");
    },
    onCompleted: () => {
      notify(`Gracias por registrarte!. Ahora podrás iniciar sesión con tu correo y contraseña.`);
      redirectToLogin();
    },
  });

  const redirectToLogin = () => {
    setTimeout(() => {
      router.replace("/login");
    }, 2000);
  };

  const handleAccountTypeChange = (e: SellerType) => {
    setFormData((prev) => ({
      ...prev,
      sellerType: e,
    }));
  };

  const handleBusinessTypeChange = (value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      businessType: value as BusinessType,
    }));
  };

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Apply appropriate sanitization based on input type
    switch (name) {
      case "firstName":
      case "lastName":
        sanitizedValue = sanitizeNameInput(value);
        break;
      case "displayName":
      case "businessName":
        sanitizedValue = sanitizeTextInput(value);
        break;
      case "email":
        sanitizedValue = sanitizeEmailInput(value);
        break;
      case "password":
      case "confirmPassword":
        // Don't sanitize passwords as they might need special characters
        sanitizedValue = value;
        break;
      default:
        sanitizedValue = sanitizeTextInput(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const submitPerson = () => {
    const { email, password, confirmPassword, firstName, lastName } = formData as RegisterPerson;
    if (!email || !password || !confirmPassword || !firstName) {
      notifyError("Por favor, completa todos los campos obligatorios.");
      return;
    }
    if (password !== confirmPassword) {
      notifyError("Las contraseñas no coinciden.");
      return;
    }

    // Final sanitization before submission
    const sanitizedData = {
      firstName: sanitizeNameInput(firstName),
      lastName: lastName ? sanitizeNameInput(lastName) : undefined,
      email: sanitizeEmailInput(email),
      password: password, // Don't sanitize password
    };

    RegisterPerson({
      variables: {
        input: sanitizedData,
      },
    });
  };
  const submitBusiness = () => {
    const { email, password, confirmPassword, businessName, businessType, sellerType } = formData as RegisterBusiness;
    if (!email || !password || !confirmPassword || !businessName || !businessType || !sellerType) {
      notifyError("Por favor, completa todos los campos obligatorios.");
      return;
    }
    if (password !== confirmPassword) {
      notifyError("Las contraseñas no coinciden.");
      return;
    }

    // Final sanitization before submission
    const sanitizedData = {
      businessName: businessName ? sanitizeTextInput(businessName) : undefined,
      email: sanitizeEmailInput(email),
      password: password, // Don't sanitize password
      businessType,
      sellerType,
    };

    RegisterBusiness({
      variables: {
        input: sanitizedData,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { sellerType } = formData;

    if (sellerType === "PERSON") {
      submitPerson();
    } else if (sellerType === "STARTUP" || sellerType === "COMPANY") {
      submitBusiness();
    }
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    registerPersonLoading,
    registerBusinessLoading,
    handleFormData,
    handleAccountTypeChange,
    handleBusinessTypeChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSubmit,
  };
}
