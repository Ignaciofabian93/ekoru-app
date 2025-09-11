import { useEffect, useState } from "react";
import useSessionStore from "@/store/session";

export default function usePersonalInfo() {
  const { data } = useSessionStore();
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [memberSince, setMemberSince] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    const userType = data.profile?.__typename;
    const displayName = data.profile?.displayName || "";
    const user =
      userType === "PersonProfile"
        ? `${data.profile.firstName} ${data.profile.lastName}`
        : "";
    const businessName =
      userType !== "PersonProfile" ? data.profile.businessName : "";
    const address = data.county?.county
      ? `${data.address}, ${data.county?.county}`
      : "Sin dirección registrada";

    if (userType === "PersonProfile") {
      setUsername(displayName || user);
      setBio(data.profile.bio || "Sin biografía");
      setLocation(address);
      setEmail(data.email);
      setPhone(data.phone || "Sin teléfono registrado");
      setMemberSince(data.createdAt.split("T")[0]);
      setIsVerified(data.isVerified);
    } else {
      setUsername(businessName || "");
      setBio(data.profile?.description || "Sin descripción");
      setLocation(address);
      setEmail(data.email);
      setPhone(data.phone || "Sin teléfono registrado");
      setMemberSince(data.createdAt.split("T")[0]);
      setIsVerified(data.isVerified);
    }
  }, [data]);

  return {
    username,
    bio,
    location,
    email,
    phone,
    memberSince,
    isVerified,
  };
}
