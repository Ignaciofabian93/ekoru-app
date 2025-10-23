import { City, Country, County, Region } from "@/types/location";
import { PersonProfile, Seller, BusinessProfile } from "@/types/user";
import { ContactMethod } from "@/types/enums";
import {
  Briefcase,
  Cake,
  Calendar,
  Calendar1,
  Flag,
  Globe,
  List,
  MapIcon,
  MapPin,
  MessageCircle,
  Phone,
  Pin,
  UserRound,
} from "lucide-react";
import Input from "@/ui/inputs/input";
import Select from "@/ui/inputs/select";
import TextArea from "@/ui/inputs/textarea";
import BusinessHoursInput from "@/ui/inputs/businessHoursInput";
import useSessionData from "@/hooks/useSessionData";
import { BusinessHours } from "@/utils/businessHoursUtils";

type Props = {
  formData: Seller;
  countries: Country[];
  regions: Region[];
  cities: City[];
  counties: County[];
  countriesLoading: boolean;
  regionsLoading: boolean;
  citiesLoading: boolean;
  countiesLoading: boolean;
  updateCountry: (countryId: number) => void;
  updateRegion: (regionId: number) => void;
  updateCity: (cityId: number) => void;
  updateCounty: (countyId: number) => void;
  handleUpdateUser: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  updatePreferredContactMethod: (method: string) => void;
  handleUpdateProfile: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  handleBirthdayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBusinessStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaxIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLegalRepresentativeTaxIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBusinessHoursChange: (hours: BusinessHours) => void;
  validateBirthdayField: () => { isValid: boolean; error?: string };
  validateBusinessStartDateField: () => { isValid: boolean; error?: string };
  validateTaxIdField: () => { isValid: boolean; error?: string };
  validateLegalRepresentativeTaxIdField: () => { isValid: boolean; error?: string };
  validatePhoneField: () => {
    isValid: boolean;
    error?: string;
    type?: "mobile" | "landline" | "international";
    isWhatsAppCompatible?: boolean;
  };
  handleSocialMediaLinkChange: (platform: "instagram" | "facebook" | "tiktok", url: string) => void;
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
  handleBusinessStartDateChange,
  handlePhoneChange,
  handleTaxIdChange,
  handleLegalRepresentativeTaxIdChange,
  handleBusinessHoursChange,
  validateBirthdayField,
  validateBusinessStartDateField,
  validateTaxIdField,
  validateLegalRepresentativeTaxIdField,
  validatePhoneField,
  handleSocialMediaLinkChange,
}: Props) {
  const { isPersonProfile, isBusinessProfile, isMixedBusiness, isRetailBusiness, isServicesBusiness } =
    useSessionData();

  // Helper to get the correct profile based on seller type
  const getProfile = (): PersonProfile | BusinessProfile | undefined => {
    return isPersonProfile ? (formData.profile as PersonProfile) : (formData.profile as BusinessProfile);
  };

  // Helper to get field value with fallback
  const getProfileField = (field: string, defaultValue: string = ""): string => {
    const profile = getProfile();
    return (profile?.[field as keyof typeof profile] as string) || defaultValue;
  };

  return (
    <form className="">
      <Wrapper>
        {/* SELLER FIELDS */}
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
          value={formData.address as string}
          onChange={handleUpdateUser as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="Calle, número"
        />
        <Input
          name="phone"
          icon={Phone}
          label="Celular"
          type="text"
          value={formData.phone as string}
          onChange={handlePhoneChange}
          placeholder="+56-9-12345678"
          maxLength={20}
          isInvalid={!validatePhoneField().isValid}
          errorMessage={validatePhoneField().error}
        />
      </Wrapper>
      <Wrapper>
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
        <Input
          icon={Globe}
          name="website"
          label="Sitio Web"
          type="text"
          value={formData.website || ""}
          onChange={handleUpdateUser as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="Ej: www.misitioweb.com"
        />
      </Wrapper>
      {isPersonProfile && (
        <Wrapper>
          <Input
            name="birthday"
            icon={Cake}
            label="Fecha de Nacimiento"
            type="text"
            value={getProfileField("birthday")}
            onChange={handleBirthdayChange}
            placeholder="DD-MM-YYYY"
            maxLength={10}
            isInvalid={!validateBirthdayField().isValid}
            errorMessage={validateBirthdayField().error}
          />
          <Input
            name="displayName"
            icon={UserRound}
            label={"Nickname/Apodo"}
            type="text"
            value={getProfileField("displayName")}
            onChange={handleUpdateProfile as React.ChangeEventHandler<HTMLInputElement>}
            placeholder={"Ej: Juanito123"}
          />
        </Wrapper>
      )}
      {isBusinessProfile && (
        <Wrapper>
          <Input
            name="legalBusinessName"
            icon={UserRound}
            label="Razón Social"
            type="text"
            value={getProfileField("legalBusinessName")}
            onChange={handleUpdateProfile as React.ChangeEventHandler<HTMLInputElement>}
            placeholder="Ej: Mi Empresa S.A."
          />
          <Input
            name="taxId"
            icon={Briefcase}
            label="RUT"
            type="text"
            value={getProfileField("taxId")}
            onChange={handleTaxIdChange}
            placeholder="Ej: 72.345.678-9"
            maxLength={12}
            isInvalid={!validateTaxIdField().isValid}
            errorMessage={validateTaxIdField().error}
          />
        </Wrapper>
      )}
      {isBusinessProfile && (
        <Wrapper>
          <Input
            name="businessStartDate"
            icon={Calendar}
            label="Fecha Inicio de Actividades"
            type="text"
            value={getProfileField("businessStartDate")}
            onChange={handleBusinessStartDateChange}
            placeholder="DD-MM-YYYY"
            maxLength={10}
            isInvalid={!validateBusinessStartDateField().isValid}
            errorMessage={validateBusinessStartDateField().error}
          />
          <Input
            name="legalRepresentative"
            icon={UserRound}
            label="Representante Legal"
            type="text"
            value={getProfileField("legalRepresentative")}
            onChange={handleUpdateProfile as React.ChangeEventHandler<HTMLInputElement>}
            placeholder="Ej: Juan Pérez"
          />
          <Input
            name="legalRepresentativeTaxId"
            icon={Briefcase}
            label="RUT Representante Legal"
            type="text"
            value={getProfileField("legalRepresentativeTaxId")}
            onChange={handleLegalRepresentativeTaxIdChange}
            placeholder="Ej: 12.345.678-9"
            maxLength={12}
            isInvalid={!validateLegalRepresentativeTaxIdField().isValid}
            errorMessage={validateLegalRepresentativeTaxIdField().error}
          />
        </Wrapper>
      )}
      {(isRetailBusiness || isMixedBusiness) && (
        <>
          <Wrapper>
            <TextArea
              name="shippingPolicy"
              label="Política de Envío"
              value={getProfileField("shippingPolicy")}
              onChange={handleUpdateProfile as React.ChangeEventHandler<HTMLTextAreaElement>}
              placeholder="Escribe tu política de envío..."
            />
          </Wrapper>
          <Wrapper>
            <TextArea
              name="returnPolicy"
              label="Política de Devoluciones"
              value={getProfileField("returnPolicy")}
              onChange={handleUpdateProfile as React.ChangeEventHandler<HTMLTextAreaElement>}
              placeholder="Escribe tu política de devoluciones..."
            />
          </Wrapper>
        </>
      )}
      {(isServicesBusiness || isMixedBusiness) && (
        <>
          <Wrapper>
            <Input
              name="serviceArea"
              label="Área de Servicio"
              type="text"
              value={getProfileField("serviceArea")}
              onChange={handleUpdateProfile as React.ChangeEventHandler<HTMLInputElement>}
              placeholder="Ej: Santiago, Valparaíso"
              icon={MapIcon}
            />
            <Input
              name="travelRadius"
              label="Radio de Desplazamiento (km)"
              type="number"
              value={getProfileField("travelRadius")}
              onChange={handleUpdateProfile as React.ChangeEventHandler<HTMLInputElement>}
              placeholder="Ej: 10"
              icon={Pin}
            />
          </Wrapper>
          <Wrapper>
            <Input
              name="certifications"
              label="Certificaciones"
              type="text"
              value={getProfileField("certifications")}
              onChange={handleUpdateProfile as React.ChangeEventHandler<HTMLInputElement>}
              placeholder="Ej: Certificación en Ventas"
              icon={List}
            />
            <Input
              name="yearsOfExperience"
              label="Años de Experiencia"
              type="number"
              value={getProfileField("yearsOfExperience")}
              onChange={handleUpdateProfile as React.ChangeEventHandler<HTMLInputElement>}
              placeholder="Ej: 5"
              icon={Calendar1}
            />
          </Wrapper>
        </>
      )}
      <Wrapper>
        <Input
          hasIcon={false}
          name="instagram"
          label="Instagram"
          type="text"
          value={formData.socialMediaLinks?.instagram || ""}
          onChange={(e) => handleSocialMediaLinkChange("instagram", (e.target as HTMLInputElement).value)}
          placeholder="Ej: @miusuario"
        />
        <Input
          hasIcon={false}
          name="facebook"
          label="Facebook"
          type="text"
          value={formData.socialMediaLinks?.facebook || ""}
          onChange={(e) => handleSocialMediaLinkChange("facebook", (e.target as HTMLInputElement).value)}
          placeholder="Ej: @miusuario"
        />
        <Input
          hasIcon={false}
          name="tiktok"
          label="TikTok"
          type="text"
          value={formData.socialMediaLinks?.tiktok || ""}
          onChange={(e) => handleSocialMediaLinkChange("tiktok", (e.target as HTMLInputElement).value)}
          placeholder="Ej: @miusuario"
        />
      </Wrapper>
      {isBusinessProfile && (
        <Wrapper>
          <BusinessHoursInput
            value={(formData.profile as BusinessProfile)?.businessHours || {}}
            onChange={handleBusinessHoursChange}
          />
        </Wrapper>
      )}
      <Wrapper>
        <TextArea
          label={isPersonProfile ? "Biografía" : "Descripción de la empresa"}
          value={getProfileField(isPersonProfile ? "bio" : "description")}
          name={isPersonProfile ? "bio" : "description"}
          onChange={handleUpdateProfile as React.ChangeEventHandler<HTMLTextAreaElement>}
          placeholder={isPersonProfile ? "Escribe algo sobre ti..." : "Escribe algo sobre tu negocio..."}
        />
      </Wrapper>
    </form>
  );
}
