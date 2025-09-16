import { City, Country, County, Region } from "@/types/location";
import { Seller } from "@/types/user";
import { ContactMethod } from "@/types/enums";
import {
  BookOpenText,
  Cake,
  Flag,
  MapPin,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";
import Input from "@/ui/inputs/input";
import Select from "@/ui/inputs/select";

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
  { label: "Todas", value: "ALL" },
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
          icon={MapPin}
          label="Dirección"
          type="text"
          value=""
          onChange={() => {}}
          placeholder="Calle, número, etc."
        />
        <Input
          icon={Phone}
          label="Celular"
          type="text"
          value=""
          onChange={() => {}}
          placeholder="+56 9 1234 5678"
        />
      </Wrapper>
      <Wrapper>
        <Input
          icon={UserRound}
          label={
            sellerType === "PERSON" ? "Nickname/Apodo" : "Nombre de la empresa"
          }
          type="text"
          value=""
          onChange={() => {}}
          placeholder={
            sellerType === "PERSON" ? "Ej: Juanito123" : "Ej: Mi Empresa"
          }
        />
        <Input
          icon={BookOpenText}
          label={
            sellerType === "PERSON" ? "Biografía" : "Descripción de la empresa"
          }
          type="text"
          value=""
          onChange={() => {}}
          placeholder={
            sellerType === "PERSON"
              ? "Escribe algo sobre ti..."
              : "Escribe algo sobre tu empresa..."
          }
        />
      </Wrapper>
      <Wrapper>
        <Input
          icon={Cake}
          label={
            sellerType === "PERSON"
              ? "Fecha de Nacimiento"
              : "Fecha de constitución"
          }
          type="text"
          value=""
          onChange={() => {}}
          placeholder="01/12/2000"
        />
        <Select
          icon={MessageCircle}
          label="Método de contacto"
          options={contactOptions.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          onChange={() => {}}
        />
      </Wrapper>
    </form>
  );
}
