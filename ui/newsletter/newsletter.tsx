import { Mails } from "lucide-react";
import Input from "../inputs/input";

export default function NewsLetter() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-light via-primary to-primary-dark text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Quieres ser parte del cambio?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Únete a nuestra comunidad de consumidores conscientes y recibe las mejores ofertas en productos ecológicos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <Input placeholder="Tu email aquí" value="" onChange={() => {}} icon={Mails} />
          <button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-light transition-colors duration-200">
            Suscribirme
          </button>
        </div>
        <p className="text-white/70 text-sm mt-4">* No enviamos spam. Puedes cancelar en cualquier momento.</p>
      </div>
    </section>
  );
}
