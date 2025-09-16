import { City, Country, County, Region } from "@/types/location";
import { Seller } from "@/types/user";
import { BookOpenText, Flag, MapPin, Phone, UserRound } from "lucide-react";
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
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 items-center justify-between sm:space-y-0 mb-4">
    {children}
  </div>
);

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
}: Props) {
  console.log("formData:: ", formData);

  const sellerType = formData?.sellerType;

  return (
    <form onSubmit={handleSubmit} className="">
      <Wrapper>
        <Select
          label="País"
          icon={Flag}
          options={countries.map((c) => ({ label: c.country, value: c.id }))}
          onChange={() => {}}
          disabled={countriesLoading}
        />
        <Select
          label="Región"
          icon={Flag}
          options={regions.map((r) => ({ label: r.region, value: r.id }))}
          onChange={() => {}}
          disabled={regionsLoading || !formData.countryId}
        />
      </Wrapper>
      <Wrapper>
        <Select
          label="Ciudad"
          icon={Flag}
          options={cities.map((c) => ({ label: c.city, value: c.id }))}
          onChange={() => {}}
          disabled={citiesLoading || !formData.regionId}
        />
        <Select
          label="Comuna"
          icon={Flag}
          options={counties.map((c) => ({ label: c.county, value: c.id }))}
          onChange={() => {}}
          disabled={countiesLoading || !formData.cityId}
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
    </form>
  );
}
