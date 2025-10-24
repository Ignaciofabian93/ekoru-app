import { GET_CITIES, GET_COUNTIES, GET_COUNTRIES, GET_REGIONS } from "@/graphql/location/queries";
import { City, Country, County, Region } from "@/types/location";
import { Seller, PersonProfile, BusinessProfile } from "@/types/user";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  formatBirthdayInput,
  convertToDisplayFormat,
  validateBirthday,
  validateBusinessStartDate,
  convertToDateObject,
} from "@/utils/dateUtils";
import {
  formatPhoneInput,
  validatePhoneNumber,
  getPhoneForStorage as getPhoneStorageFormat,
  isWhatsAppCompatible,
} from "@/utils/phoneUtils";
import { formatRutInput, validateRut, getRutForStorage, convertRutToDisplayFormat } from "@/utils/rutUtils";
import { BusinessHours } from "@/utils/businessHoursUtils";
import { UPDATE_BUSINESS_PROFILE, UPDATE_PERSON_PROFILE } from "@/graphql/session/mutations";
import { UPDATE_SELLER } from "@/graphql/user/mutations";
import useSessionStore, { defaultSeller } from "@/store/session";
import useAlert from "@/hooks/useAlert";

export default function useProfileForm() {
  const { notify, notifyError } = useAlert();
  const { data, handleSession } = useSessionStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<Seller>(defaultSeller);

  const [Countries, { data: countriesData, loading: countriesLoading }] = useLazyQuery(GET_COUNTRIES);
  const [RegionsByCountryId, { data: regionsData, loading: regionsLoading }] = useLazyQuery(GET_REGIONS);
  const [CitiesByRegionId, { data: citiesData, loading: citiesLoading }] = useLazyQuery(GET_CITIES);
  const [CountiesByCityId, { data: countiesData, loading: countiesLoading }] = useLazyQuery(GET_COUNTIES);

  const [UpdateSeller, { loading: updatingSeller }] = useMutation(UPDATE_SELLER, {
    onCompleted: (response) => {
      console.log("Seller update response:", response);

      handleSession(response.updateSeller as Seller);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      notifyError("Error al intentar actualizar el perfil.");
    },
  });
  const [UpdatePersonProfile, { loading: updatingPersonProfile }] = useMutation(UPDATE_PERSON_PROFILE, {
    onCompleted: (response) => {
      try {
        // Merge the updated profile with existing seller data
        if (!response?.updatePersonProfile) {
          throw new Error("No se recibió respuesta del servidor");
        }

        const updated = {
          ...data,
          profile: response.updatePersonProfile,
        };

        handleSession(updated as Seller);
        notify("Perfil actualizado con éxito");
        setIsOpen(false);
      } catch (error) {
        console.error("Error processing profile update response:", error);
        notifyError("Error al procesar la respuesta del servidor");
      }
    },
    onError: (error) => {
      console.error("Error updating person profile:", error);
      notifyError("Error al intentar actualizar el perfil. Por favor, inténtalo de nuevo más tarde.");
    },
  });

  const [UpdateBusinessProfile, { loading: updatingBusinessProfile }] = useMutation(UPDATE_BUSINESS_PROFILE, {
    onCompleted: (response) => {
      try {
        if (!response?.updateBusinessProfile) {
          throw new Error("No se recibió respuesta del servidor");
        }

        const updated = {
          ...data,
          profile: response.updateBusinessProfile,
        };

        handleSession(updated as Seller);
        notify("Perfil actualizado con éxito");
        setIsOpen(false);
      } catch (error) {
        console.error("Error processing business profile update response:", error);
        notifyError("Error al procesar la respuesta del servidor");
      }
    },
    onError: (error) => {
      console.error("Error updating business profile:", error);
      console.error("GraphQL errors:", error.graphQLErrors);
      console.error("Network error:", error.networkError);
      notifyError("Error al intentar actualizar el perfil.");
    },
  });

  useEffect(() => {
    Countries();
  }, [Countries]);

  useEffect(() => {
    if (form.country?.id) {
      RegionsByCountryId({ variables: { countryId: form.country.id } });
    }
  }, [form.country?.id, RegionsByCountryId]);

  useEffect(() => {
    if (form.region?.id) {
      CitiesByRegionId({ variables: { regionId: form.region.id } });
    }
  }, [form.region?.id, CitiesByRegionId]);

  useEffect(() => {
    if (form.city?.id) {
      CountiesByCityId({ variables: { cityId: form.city.id } });
    }
  }, [form.city?.id, CountiesByCityId]);

  useEffect(() => {
    const loadProfile = () => {
      const profileData = { ...data };

      // Convert birthday from storage format (YYYY-MM-DD) to display format (DD-MM-YYYY)
      if (profileData.profile && "birthday" in profileData.profile && profileData.profile.birthday) {
        profileData.profile = {
          ...profileData.profile,
          birthday: convertToDisplayFormat(profileData.profile.birthday),
        };
      }

      // Convert businessStartDate from storage format (YYYY-MM-DD) to display format (DD-MM-YYYY)
      if (profileData.profile && "businessStartDate" in profileData.profile && profileData.profile.businessStartDate) {
        profileData.profile = {
          ...profileData.profile,
          businessStartDate: convertToDisplayFormat(profileData.profile.businessStartDate),
        };
      }

      // Convert taxId (RUT) to display format
      if (profileData.profile && "taxId" in profileData.profile && profileData.profile.taxId) {
        profileData.profile = {
          ...profileData.profile,
          taxId: convertRutToDisplayFormat(profileData.profile.taxId),
        };
      }

      // Convert legalRepresentativeTaxId (RUT) to display format
      if (
        profileData.profile &&
        "legalRepresentativeTaxId" in profileData.profile &&
        profileData.profile.legalRepresentativeTaxId
      ) {
        profileData.profile = {
          ...profileData.profile,
          legalRepresentativeTaxId: convertRutToDisplayFormat(profileData.profile.legalRepresentativeTaxId),
        };
      }

      setForm(profileData);
    };

    loadProfile();
  }, [data]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const updateCountry = (countryId: number) => {
    const country = countriesData.countries.find((c: Country) => Number(c.id) === countryId);
    if (country) {
      setForm({
        ...form,
        country,
        region: { id: 0, region: "", countryId: country.id },
        city: { id: 0, city: "", regionId: 0 },
        county: { id: 0, county: "", cityId: 0 },
      });
    }
  };

  const updateRegion = (regionId: number) => {
    const region = regionsData.regionsByCountryId.find((r: Region) => Number(r.id) === regionId);
    if (region) {
      setForm({
        ...form,
        region,
        city: { id: 0, city: "", regionId: region.id },
        county: { id: 0, county: "", cityId: 0 },
      });
    }
  };

  const updateCity = (cityId: number) => {
    const city = citiesData.citiesByRegionId.find((c: City) => Number(c.id) === cityId);
    if (city) {
      setForm({
        ...form,
        city,
        county: { id: 0, county: "", cityId: city.id },
      });
    }
  };

  const updateCounty = (countyId: number) => {
    const county = countiesData.countiesByCityId.find((c: County) => Number(c.id) === countyId);
    if (county) {
      setForm({
        ...form,
        county,
      });
    }
  };

  const updatePreferredContactMethod = (method: string) => {
    setForm({
      ...form,
      preferredContactMethod: method as Seller["preferredContactMethod"],
    });
  };

  const handleUpdateUser = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdateProfile = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, profile: { ...form.profile, [name]: value } });
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatBirthdayInput(e.target.value);

    // Only update if this is a person profile
    if (form.sellerType === "PERSON" && form.profile) {
      setForm({
        ...form,
        profile: { ...form.profile, birthday: formattedValue } as PersonProfile,
      });
    }
  };

  const handleBusinessStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatBirthdayInput(e.target.value); // Same format as birthday (DD-MM-YYYY)

    // Only update if this is a business profile
    if ((form.sellerType === "STARTUP" || form.sellerType === "COMPANY") && form.profile) {
      setForm({
        ...form,
        profile: { ...form.profile, businessStartDate: formattedValue } as BusinessProfile,
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneInput(e.target.value);
    setForm({
      ...form,
      phone: formattedValue,
    });
  };

  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatRutInput(e.target.value);

    // Only update if this is a business profile
    if ((form.sellerType === "STARTUP" || form.sellerType === "COMPANY") && form.profile) {
      setForm({
        ...form,
        profile: { ...form.profile, taxId: formattedValue } as BusinessProfile,
      });
    }
  };

  const handleLegalRepresentativeTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatRutInput(e.target.value);

    // Only update if this is a business profile
    if ((form.sellerType === "STARTUP" || form.sellerType === "COMPANY") && form.profile) {
      setForm({
        ...form,
        profile: { ...form.profile, legalRepresentativeTaxId: formattedValue } as BusinessProfile,
      });
    }
  };

  const handleBusinessHoursChange = (hours: BusinessHours) => {
    // Only update if this is a business profile
    if ((form.sellerType === "STARTUP" || form.sellerType === "COMPANY") && form.profile) {
      setForm({
        ...form,
        profile: { ...form.profile, businessHours: hours as Record<string, unknown> } as BusinessProfile,
      });
    }
  };

  const getBirthdayForStorage = (): Date | null => {
    if (!form.profile || !("birthday" in form.profile) || !form.profile.birthday) {
      return null;
    }
    try {
      return convertToDateObject(form.profile.birthday);
    } catch (error) {
      console.error("Error converting birthday to date:", error);
      return null;
    }
  };

  const getBusinessStartDateForStorage = (): Date | null => {
    if (!form.profile || !("businessStartDate" in form.profile) || !form.profile.businessStartDate) {
      return null;
    }
    try {
      return convertToDateObject(form.profile.businessStartDate);
    } catch (error) {
      console.error("Error converting business start date to date:", error);
      return null;
    }
  };

  const getPhoneForStorage = (): string => {
    if (!form.phone) {
      return "";
    }
    try {
      return getPhoneStorageFormat(form.phone);
    } catch (error) {
      console.error("Error formatting phone for storage:", error);
      return "";
    }
  };

  const validateBirthdayField = (): { isValid: boolean; error?: string } => {
    if (form.profile && "birthday" in form.profile && form.profile.birthday) {
      return validateBirthday(form.profile.birthday);
    }
    return { isValid: true };
  };

  const validateBusinessStartDateField = (): { isValid: boolean; error?: string } => {
    if (form.profile && "businessStartDate" in form.profile && form.profile.businessStartDate) {
      return validateBusinessStartDate(form.profile.businessStartDate);
    }
    return { isValid: true };
  };

  const validateTaxIdField = (): { isValid: boolean; error?: string } => {
    if (form.profile && "taxId" in form.profile && form.profile.taxId) {
      return validateRut(form.profile.taxId);
    }
    return { isValid: true };
  };

  const validateLegalRepresentativeTaxIdField = (): { isValid: boolean; error?: string } => {
    if (form.profile && "legalRepresentativeTaxId" in form.profile && form.profile.legalRepresentativeTaxId) {
      return validateRut(form.profile.legalRepresentativeTaxId);
    }
    return { isValid: true };
  };

  const validatePhoneField = (): {
    isValid: boolean;
    error?: string;
    type?: "mobile" | "landline" | "international";
    isWhatsAppCompatible?: boolean;
  } => {
    if (form.phone) {
      const validation = validatePhoneNumber(form.phone);
      return {
        ...validation,
        isWhatsAppCompatible: isWhatsAppCompatible(form.phone),
      };
    }
    return { isValid: true };
  };

  const handleSocialMediaLinkChange = (platform: "instagram" | "facebook" | "tiktok", url: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      socialMediaLinks: {
        ...prevForm.socialMediaLinks,
        [platform]: url,
      },
    }));
  };

  const submitPersonProfile = async () => {
    try {
      const { country, region, city, county, profile, phone, address } = form;
      const { birthday, bio, displayName } = profile as PersonProfile;
      if (!country?.id) {
        notifyError("Por favor, selecciona un país.");
        return;
      }
      if (!region?.id) {
        notifyError("Por favor, selecciona una región.");
        return;
      }
      if (!city?.id) {
        notifyError("Por favor, selecciona una ciudad.");
        return;
      }
      if (!county?.id) {
        notifyError("Por favor, selecciona una comuna.");
        return;
      }
      if (!address) {
        notifyError("Por favor, ingresa una dirección.");
        return;
      }
      if (!phone) {
        notifyError("Por favor, ingresa un número de teléfono.");
        return;
      }
      if (!birthday) {
        notifyError("Por favor, ingresa una fecha de nacimiento.");
        return;
      }
      const birthdayValidation = validateBirthdayField();
      if (!birthdayValidation.isValid) {
        notifyError(birthdayValidation.error || "Fecha de nacimiento inválida.");
        return;
      }
      const phoneValidation = validatePhoneField();
      if (!phoneValidation.isValid) {
        notifyError(phoneValidation.error || "Número de teléfono inválido.");
        return;
      }

      // Update User first
      const userInput = {
        email: form.email,
        countryId: Number(form.country?.id),
        regionId: Number(form.region?.id),
        cityId: Number(form.city?.id),
        countyId: Number(form.county?.id),
        phone: getPhoneForStorage(),
        address,
        socialMediaLinks: form.socialMediaLinks,
        preferredContactMethod: form.preferredContactMethod,
        website: form.website || null,
      };

      const { data: sellerData } = await UpdateSeller({ variables: { input: userInput } });

      // Update Profile after user is updated
      if (sellerData?.updateSeller) {
        const profileInput = {
          bio: bio || null,
          birthday: getBirthdayForStorage(),
          displayName: displayName || null,
        };

        await UpdatePersonProfile({ variables: { input: profileInput } });
      }
    } catch (error) {
      console.error("Error in submitPersonProfile:", error);
      notifyError("Error al actualizar el perfil. Por favor, inténtalo de nuevo.");
    }
  };

  const submitBusinessProfile = async () => {
    const { country, region, city, county, profile, phone, address } = form;

    if (!profile) {
      notifyError("Error: No se encontró el perfil de la empresa.");
      return;
    }

    const {
      businessName,
      legalBusinessName,
      taxId,
      travelRadius,
      serviceArea,
      certifications,
      description,
      legalRepresentative,
      legalRepresentativeTaxId,
      returnPolicy,
      shippingPolicy,
      yearsOfExperience,
      businessHours,
      businessStartDate,
    } = profile as BusinessProfile;
    if (!country?.id) {
      notifyError("Por favor, selecciona un país.");
      return;
    }
    if (!region?.id) {
      notifyError("Por favor, selecciona una región.");
      return;
    }
    if (!city?.id) {
      notifyError("Por favor, selecciona una ciudad.");
      return;
    }
    if (!county?.id) {
      notifyError("Por favor, selecciona una comuna.");
      return;
    }
    if (!address) {
      notifyError("Por favor, ingresa una dirección.");
      return;
    }
    if (!phone) {
      notifyError("Por favor, ingresa un número de teléfono.");
      return;
    }
    if (!legalBusinessName) {
      notifyError("Por favor, ingresa la razón social.");
      return;
    }

    // Validate taxId (RUT) if provided
    if (taxId) {
      const taxIdValidation = validateTaxIdField();
      if (!taxIdValidation.isValid) {
        notifyError(taxIdValidation.error || "RUT inválido.");
        return;
      }
    }

    // Validate legalRepresentativeTaxId (RUT) if provided
    if (legalRepresentativeTaxId) {
      const legalRepTaxIdValidation = validateLegalRepresentativeTaxIdField();
      if (!legalRepTaxIdValidation.isValid) {
        notifyError(legalRepTaxIdValidation.error || "RUT del representante legal inválido.");
        return;
      }
    }

    // Validate businessStartDate if provided
    if (businessStartDate) {
      const businessStartDateValidation = validateBusinessStartDateField();
      if (!businessStartDateValidation.isValid) {
        notifyError(businessStartDateValidation.error || "Fecha de inicio de actividades inválida.");
        return;
      }
    }

    const userInput = {
      email: form.email,
      countryId: Number(form.country?.id),
      regionId: Number(form.region?.id),
      cityId: Number(form.city?.id),
      countyId: Number(form.county?.id),
      phone: getPhoneForStorage(),
      address,
      socialMediaLinks: form.socialMediaLinks,
      preferredContactMethod: form.preferredContactMethod,
      website: form.website || null,
    };

    const businessInput = {
      businessName: businessName || null,
      description: description || null,
      legalBusinessName: legalBusinessName || null,
      taxId: taxId ? getRutForStorage(taxId) : null,
      businessStartDate: getBusinessStartDateForStorage(),
      legalRepresentative: legalRepresentative || null,
      legalRepresentativeTaxId: legalRepresentativeTaxId ? getRutForStorage(legalRepresentativeTaxId) : null,
      shippingPolicy: shippingPolicy || null,
      returnPolicy: returnPolicy || null,
      serviceArea: serviceArea || null,
      yearsOfExperience: yearsOfExperience ? Number(yearsOfExperience) : null,
      certifications: certifications || null,
      travelRadius: travelRadius ? Number(travelRadius) : null,
      businessHours: businessHours || null,
    };

    try {
      const { data } = await UpdateSeller({ variables: { input: userInput } });

      if (data?.updateSeller) {
        // Update Profile after user is updated
        await UpdateBusinessProfile({ variables: { input: businessInput } });
      }
    } catch (error) {
      console.error("Error in submitBusinessProfile:", error);
      throw error; // Re-throw to let the mutation's onError handler catch it
    }
  };

  const handleSubmit = () => {
    if (form.sellerType === "PERSON") {
      submitPersonProfile();
    } else if (form.sellerType === "STARTUP" || form.sellerType === "COMPANY") {
      submitBusinessProfile();
    }
  };

  return {
    form,
    isOpen,
    openModal,
    closeModal,
    countriesData: (countriesData?.countries as Country[]) || [],
    countriesLoading,
    regionsData: (regionsData?.regionsByCountryId as Region[]) || [],
    regionsLoading,
    citiesData: (citiesData?.citiesByRegionId as City[]) || [],
    citiesLoading,
    countiesData: (countiesData?.countiesByCityId as County[]) || [],
    countiesLoading,
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
    getBirthdayForStorage,
    getPhoneForStorage,
    validateBirthdayField,
    validateBusinessStartDateField,
    validateTaxIdField,
    validateLegalRepresentativeTaxIdField,
    validatePhoneField,
    handleSocialMediaLinkChange,
    handleSubmit,
    updatingSeller,
    updatingPersonProfile,
    updatingBusinessProfile,
  };
}
