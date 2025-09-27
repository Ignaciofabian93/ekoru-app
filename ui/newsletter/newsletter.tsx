import { Mails } from "lucide-react";
import Input from "../inputs/input";
import clsx from "clsx";
import MainButton from "../buttons/mainButton";
import Container from "../layout/container";
import { useState } from "react";
import { validateEmail } from "@/utils/regexValidations";

export default function NewsLetter() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = () => {
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <section
      className={clsx(
        "bg-gradient-to-r from-footer-light-950 via-footer-light-600 to-footer-light-950",
        "dark:from-footer-dark-950 dark:via-footer-dark-700 dark:to-footer-dark-950",
        "text-white py-16"
      )}
    >
      {/* <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> */}
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Quieres ser parte del cambio?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Únete a nuestra comunidad de consumidores conscientes y recibe las mejores ofertas en productos ecológicos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <Input
            name="email"
            type="email"
            placeholder="Tu email aquí"
            value={email}
            onChange={handleChange}
            icon={Mails}
            className="m-0"
            isInvalid={email.length > 0 && !validateEmail(email)}
            errorMessage="Por favor, ingresa un correo electrónico válido."
          />
          <div className="flex items-center justify-center">
            <MainButton text="Suscribirme" onClick={handleSubmit} />
          </div>
        </div>
        <p className="text-white/70 text-sm mt-4">* No enviamos spam. Puedes cancelar en cualquier momento.</p>
      </Container>
      {/* </div> */}
    </section>
  );
}
