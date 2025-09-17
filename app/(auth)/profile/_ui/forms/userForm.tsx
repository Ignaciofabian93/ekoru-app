import { City, Country, County, Region } from "@/types/location";
import {
  PersonProfile,
  Seller,
  ServiceProfile,
  StoreProfile,
} from "@/types/user";
import { ContactMethod } from "@/types/enums";
import {
  Cake,
  Flag,
  Globe,
  MapPin,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";
import Input from "@/ui/inputs/input";
import Select from "@/ui/inputs/select";
import TextArea from "@/ui/inputs/textarea";

type Props = {
  formData: Seller;
  onChange: (field: keyof Seller, value: string) => void;
  countries: Country[];
  regions: Region[];
  cities: City[];
  counties: County[];
  handleSubmit: () => void;
  countriesLoading: boolean;
  regionsLoading: boolean;
  citiesLoading: boolean;
  countiesLoading: boolean;
  updateCountry: (countryId: number) => void;
  updateRegion: (regionId: number) => void;
  updateCity: (cityId: number) => void;
  updateCounty: (countyId: number) => void;
  handleUpdateUser: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  updatePreferredContactMethod: (method: string) => void;
  handleUpdateProfile: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleBirthdayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateBirthdayField: () => { isValid: boolean; error?: string };
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 items-center justify-between sm:space-y-0 mb-4">
    {children}
  </div>
);

const contactOptions: { label: string; value: ContactMethod }[] = [
  { label: "Email", value: "EMAIL" },
  { label: "Teléfono", value: "PHONE" },
  { label: "WhatsApp", value: "WHATSAPP" },
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "Facebook", value: "FACEBOOK" },
  { label: "Sitio Web", value: "WEBSITE" },
  { label: "TikTok", value: "TIKTOK" },
];

export default function UserForm({
  formData,
  countries,
  regions,
  cities,
  counties,
  handleSubmit,
  countiesLoading,
  citiesLoading,
  regionsLoading,
  countriesLoading,
  updateCountry,
  updateRegion,
  updateCity,
  updateCounty,
  handleUpdateUser,
  updatePreferredContactMethod,
  handleUpdateProfile,
  handleBirthdayChange,
  validateBirthdayField,
}: Props) {
  console.log("formData:: ", formData);

  const sellerType = formData?.sellerType;

  return (
    <form onSubmit={handleSubmit} className="">
      <Wrapper>
        <Select
          label="País"
          icon={Flag}
          value={formData.country?.id || undefined}
          options={countries.map((c) => ({ label: c.country, value: c.id }))}
          onChange={(e) => updateCountry(Number(e))}
          disabled={countriesLoading}
        />
        <Select
          label="Región"
          icon={Flag}
          value={formData.region?.id || undefined}
          options={regions.map((r) => ({ label: r.region, value: r.id }))}
          onChange={(e) => updateRegion(Number(e))}
          disabled={regionsLoading || !formData.country?.id}
        />
      </Wrapper>
      <Wrapper>
        <Select
          label="Ciudad"
          icon={Flag}
          value={formData.city?.id || undefined}
          options={cities.map((c) => ({ label: c.city, value: c.id }))}
          onChange={(e) => updateCity(Number(e))}
          disabled={citiesLoading || !formData.region?.id}
        />
        <Select
          label="Comuna"
          icon={Flag}
          value={formData.county?.id || undefined}
          options={counties.map((c) => ({ label: c.county, value: c.id }))}
          onChange={(e) => updateCounty(Number(e))}
          disabled={countiesLoading || !formData.city?.id}
        />
      </Wrapper>
      <Wrapper>
        <Input
          name="address"
          icon={MapPin}
          label="Dirección"
          type="text"
          value={formData.address}
          onChange={
            handleUpdateUser as React.ChangeEventHandler<HTMLInputElement>
          }
          placeholder="Calle, número"
        />
        <Input
          name="phone"
          icon={Phone}
          label="Celular"
          type="text"
          value={formData.phone}
          onChange={
            handleUpdateUser as React.ChangeEventHandler<HTMLInputElement>
          }
          placeholder="+56 9 1234 5678"
        />
      </Wrapper>
      <Wrapper>
        <Input
          name="displayName"
          icon={UserRound}
          label={
            sellerType === "PERSON" ? "Nickname/Apodo" : "Nombre de la empresa"
          }
          type="text"
          value={formData.profile?.displayName || ""}
          onChange={
            handleUpdateProfile as React.ChangeEventHandler<HTMLInputElement>
          }
          placeholder={
            sellerType === "PERSON" ? "Ej: Juanito123" : "Ej: Mi Empresa"
          }
        />
        <Input
          icon={Globe}
          name="website"
          label="Sitio Web"
          type="text"
          value={formData.website || ""}
          onChange={
            handleUpdateUser as React.ChangeEventHandler<HTMLInputElement>
          }
          placeholder="Ej: www.misitioweb.com"
        />
      </Wrapper>
      <Wrapper>
        {sellerType === "PERSON" && (
          <Input
            name="birthday"
            icon={Cake}
            label="Fecha de Nacimiento"
            type="text"
            value={(formData.profile as PersonProfile)?.birthday || ""}
            onChange={handleBirthdayChange}
            placeholder="DD-MM-YYYY"
            maxLength={10}
            isInvalid={!validateBirthdayField().isValid}
            errorMessage={validateBirthdayField().error}
          />
        )}
        <Select
          name="preferredContactMethod"
          icon={MessageCircle}
          label="Método de contacto preferido"
          options={contactOptions.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          value={formData.preferredContactMethod || undefined}
          onChange={(e) => updatePreferredContactMethod(e as string)}
        />
      </Wrapper>
      <Wrapper>
        <Input
          hasIcon={false}
          name="instagram"
          label="Instagram"
          type="text"
          value={formData.socialMediaLinks?.instagram || ""}
          onChange={
            handleUpdateUser as React.ChangeEventHandler<HTMLInputElement>
          }
          placeholder="Ej: @miusuario"
        />
        <Input
          hasIcon={false}
          name="facebook"
          label="Facebook"
          type="text"
          value={formData.socialMediaLinks?.facebook || ""}
          onChange={
            handleUpdateUser as React.ChangeEventHandler<HTMLInputElement>
          }
          placeholder="Ej: @miusuario"
        />
        <Input
          hasIcon={false}
          name="tiktok"
          label="TikTok"
          type="text"
          value={formData.socialMediaLinks?.tiktok || ""}
          onChange={
            handleUpdateUser as React.ChangeEventHandler<HTMLInputElement>
          }
          placeholder="Ej: @miusuario"
        />
      </Wrapper>
      <Wrapper>
        <TextArea
          label={
            sellerType === "PERSON" ? "Biografía" : "Descripción de la empresa"
          }
          value={
            sellerType === "PERSON"
              ? (formData.profile as PersonProfile)?.bio || ""
              : (formData.profile as StoreProfile | ServiceProfile)
                  ?.description || ""
          }
          name={sellerType === "PERSON" ? "bio" : "description"}
          onChange={
            handleUpdateProfile as React.ChangeEventHandler<HTMLTextAreaElement>
          }
          placeholder={
            sellerType === "PERSON"
              ? "Escribe algo sobre ti..."
              : "Escribe algo sobre tu empresa..."
          }
        />
      </Wrapper>
    </form>
  );
}
