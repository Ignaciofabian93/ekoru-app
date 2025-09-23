import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_PERSON, REGISTER_SERVICE, REGISTER_STORE } from "@/graphql/session/mutations";
import { type SellerType } from "@/types/enums";
import useAlert from "@/hooks/useAlert";
import { useRouter } from "next/navigation";

export type RegisterPerson = {
  firstName: string;
  lastName?: string; // Optional for PERSON type
  email: string;
  password: string;
  confirmPassword: string;
  sellerType: SellerType;
};

export type RegisterStore = {
  displayName: string;
  businessName?: string; // Optional for STORE type
  sellerType: SellerType;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterService = {
  displayName: string;
  businessName?: string; // Optional for SERVICE type
  sellerType: SellerType;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function useRegister() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterPerson | RegisterStore | RegisterService>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    sellerType: "PERSON",
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
  const [RegisterStore, { loading: registerStoreLoading }] = useMutation(REGISTER_STORE, {
    onError: () => {
      notifyError("Error al registrarse. Por favor, inténtalo de nuevo.");
    },
    onCompleted: () => {
      notify(`Gracias por registrarte!. Ahora podrás iniciar sesión con tu correo y contraseña.`);
      redirectToLogin();
    },
  });
  const [RegisterService, { loading: registerServiceLoading }] = useMutation(REGISTER_SERVICE, {
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

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    RegisterPerson({
      variables: {
        input: { firstName, lastName, email, password },
      },
    });
  };
  const submitStore = () => {
    const { email, password, confirmPassword, displayName, businessName } = formData as RegisterStore;
    if (!email || !password || !confirmPassword || !displayName) {
      notifyError("Por favor, completa todos los campos obligatorios.");
      return;
    }
    if (password !== confirmPassword) {
      notifyError("Las contraseñas no coinciden.");
      return;
    }
    RegisterStore({
      variables: {
        input: { displayName, businessName, email, password },
      },
    });
  };
  const submitService = () => {
    const { email, password, confirmPassword, displayName, businessName } = formData as RegisterService;
    if (!email || !password || !confirmPassword || !displayName) {
      notifyError("Por favor, completa todos los campos obligatorios.");
      return;
    }
    if (password !== confirmPassword) {
      notifyError("Las contraseñas no coinciden.");
      return;
    }
    RegisterService({
      variables: {
        input: { displayName, businessName, email, password },
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { sellerType } = formData;

    if (sellerType === "PERSON") {
      submitPerson();
    } else if (sellerType === "STORE") {
      submitStore();
    } else if (sellerType === "SERVICE") {
      submitService();
    }
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    registerPersonLoading,
    registerStoreLoading,
    registerServiceLoading,
    handleFormData,
    handleAccountTypeChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSubmit,
  };
}
