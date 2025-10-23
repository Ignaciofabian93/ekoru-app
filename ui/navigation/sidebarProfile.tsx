import { useEffect, useState } from "react";
import { PersonProfile, Seller, BusinessProfile } from "@/types/user";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Text } from "@/ui/text/text";

export const SideBarProfile = ({ data, closeMobileMenu }: { data: Seller | null; closeMobileMenu: () => void }) => {
  const [isPerson, setIsPerson] = useState<boolean>(false);
  const [personName, setPersonName] = useState<string>("");
  const [businessDisplayName, setBusinessDisplayName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("/brand/icon.webp");
  const [logo, setLogo] = useState<string>("/brand/icon.webp");

  useEffect(() => {
    const isPerson = data && data?.sellerType === "PERSON";

    if (isPerson) {
      setIsPerson(true);
      const profile = data?.profile as PersonProfile;
      const displayName = profile?.displayName;
      const firstName = profile?.firstName || "Nombre";
      const lastName = profile?.lastName || "Apellido";
      const profileImg = profile?.profileImage || "/brand/icon.webp";
      setPersonName(displayName ? displayName : `${firstName} ${lastName}`);
      setProfileImage(profileImg);
    }

    if (!isPerson) {
      setIsPerson(false);
      const profile = data?.profile as BusinessProfile;
      const businessName = profile?.businessName;
      const logoImg = profile?.logo || "/brand/icon.webp";
      setBusinessDisplayName(businessName || "");
      setLogo(logoImg);
    }
  }, [data]);

  const profileNavigation = [
    { name: "Perfil", href: "/profile" },
    { name: "Pedidos", href: "/profile/orders" },
    { name: "Impacto", href: "/profile/impact-dashboard" },
    { name: "Ajustes", href: "/profile/settings" },
  ];

  return (
    <section
      className={clsx(
        "p-4",
        "border-b",
        "border-sidebar-profile-dark/20",
        "bg-sidebar-profile-light/90",
        "dark:border-sidebar-profile-light/20",
        "dark:bg-sidebar-profile-dark"
      )}
    >
      <div className="flex flex-col items-center mb-3">
        <div className="w-18 h-18 bg-primary/20 rounded-full flex items-center justify-center">
          {isPerson ? (
            profileImage ? (
              <Image
                src={profileImage}
                alt="imagen de perfil"
                width={120}
                height={120}
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/brand/icon.webp"
                alt="imagen de perfil"
                width={120}
                height={120}
                className="rounded-full w-full h-full object-cover"
              />
            )
          ) : logo ? (
            <Image
              src={logo}
              alt="logo de negocio"
              width={120}
              height={120}
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <Image
              src="/brand/icon.webp"
              alt="logo de negocio"
              width={120}
              height={120}
              className="rounded-full w-full h-full object-cover"
            />
          )}
        </div>
        <div className="text-center w-full mt-3">
          <Text variant="p" className="font-medium">
            {isPerson ? personName : businessDisplayName}
          </Text>
          <Text variant="span">{data?.email}</Text>
        </div>
      </div>
      <div className="space-y-1">
        {profileNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={closeMobileMenu}
            className={clsx(
              "group", // Add group class for group hover
              "flex items-center px-4 py-3",
              "rounded-lg",
              "hover:bg-sidebar-profileLink-lightHover",
              "dark:hover:bg-sidebar-profileLink-darkHover",
              "transition-colors duration-300"
            )}
          >
            <Text variant="label" className={clsx("font-medium", "group-hover:text-primary")}>
              {item.name}
            </Text>
          </Link>
        ))}
      </div>
    </section>
  );
};
