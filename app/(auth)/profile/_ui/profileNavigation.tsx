import clsx from "clsx";
import { profileMenu } from "../_constants/data";
import Link from "next/link";

type Props = {
  openModal: () => void;
};

export default function ProfileNavigation({ openModal }: Props) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-neutral/20 p-6">
      <h3 className="text-lg font-bold text-text-primary mb-4">
        Gestionar Perfil
      </h3>
      <nav className="space-y-2">
        {profileMenu.map((item) => {
          const IconComponent = item.icon;
          if (item.name === "personalInfo") {
            return (
              <button
                key={item.name}
                onClick={openModal}
                className={clsx(
                  "flex w-full items-center p-3 rounded-lg hover:bg-neutral-light/50 transition-colors group",
                  {
                    "opacity-50 pointer-events-none": !item.enabled,
                  }
                )}
              >
                <IconComponent className="w-5 h-5 mr-3 text-neutral group-hover:text-primary transition-colors" />
                <span className="font-medium text-text-secondary group-hover:text-primary transition-colors">
                  {item.title}
                </span>
              </button>
            );
          } else {
            return (
              <Link
                key={item.title}
                href={item.href}
                className={clsx(
                  "flex items-center p-3 rounded-lg hover:bg-neutral-light/50 transition-colors group",
                  {
                    "opacity-50 pointer-events-none": !item.enabled,
                  }
                )}
              >
                <IconComponent className="w-5 h-5 mr-3 text-neutral group-hover:text-primary transition-colors" />
                <span className="font-medium text-text-secondary group-hover:text-primary transition-colors">
                  {item.title}
                </span>
              </Link>
            );
          }
        })}
      </nav>
    </section>
  );
}
