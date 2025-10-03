import { GET_CITIES, GET_COUNTIES, GET_COUNTRIES, GET_REGIONS } from "@/graphql/location/queries";
import useSessionStore, { defaultSeller } from "@/store/session";
import { City, Country, County, Region } from "@/types/location";
import { Seller, PersonProfile } from "@/types/user";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { formatBirthdayInput, convertToDisplayFormat, validateBirthday, convertToDateObject } from "@/utils/dateUtils";
import {
  formatPhoneInput,
  validatePhoneNumber,
  getPhoneForStorage as getPhoneStorageFormat,
  isWhatsAppCompatible,
} from "@/utils/phoneUtils";
import useAlert from "@/hooks/useAlert";
import { UPDATE_PERSON_PROFILE } from "@/graphql/session/mutations";
import { UPDATE_USER } from "@/graphql/user/mutations";

export default function useProfileForm() {
  const { notify, notifyError } = useAlert();
  const { data, handleSession } = useSessionStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<Seller>(defaultSeller);

  const [Countries, { data: countriesData, loading: countriesLoading }] = useLazyQuery(GET_COUNTRIES);
  const [Regions, { data: regionsData, loading: regionsLoading }] = useLazyQuery(GET_REGIONS);
  const [Cities, { data: citiesData, loading: citiesLoading }] = useLazyQuery(GET_CITIES);
  const [Counties, { data: countiesData, loading: countiesLoading }] = useLazyQuery(GET_COUNTIES);

  const [UpdateUser] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      handleSession(data.updateUser as Seller);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      notifyError("Error al intentar actualizar el usuario. Por favor, inténtalo de nuevo más tarde.");
    },
  });
  const [UpdatePersonProfile] = useMutation(UPDATE_PERSON_PROFILE, {
    onCompleted: (data) => {
      handleSession(data.updatePersonProfile as Seller);
      notify("Perfil actualizado con éxito");
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      notifyError("Error al intentar actualizar el perfil. Por favor, inténtalo de nuevo más tarde.");
    },
  });

  useEffect(() => {
    Countries();
  }, [Countries]);

  useEffect(() => {
    if (form.country?.id) {
      Regions({ variables: { countryId: form.country.id } });
    }
  }, [form.country?.id, Regions]);

  useEffect(() => {
    if (form.region?.id) {
      Cities({ variables: { regionId: form.region.id } });
    }
  }, [form.region?.id, Cities]);

  useEffect(() => {
    if (form.city?.id) {
      Counties({ variables: { cityId: form.city.id } });
    }
  }, [form.city?.id, Counties]);

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
    const region = regionsData.regions.find((r: Region) => Number(r.id) === regionId);
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
    const city = citiesData.cities.find((c: City) => Number(c.id) === cityId);
    if (city) {
      setForm({
        ...form,
        city,
        county: { id: 0, county: "", cityId: city.id },
      });
    }
  };

  const updateCounty = (countyId: number) => {
    const county = countiesData.counties.find((c: County) => Number(c.id) === countyId);
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneInput(e.target.value);
    setForm({
      ...form,
      phone: formattedValue,
    });
  };

  const getBirthdayForStorage = (): Date | null => {
    if (form.profile && "birthday" in form.profile && form.profile.birthday) {
      return convertToDateObject(form.profile.birthday);
    }
    return null;
  };

  const getPhoneForStorage = (): string => {
    if (form.phone) {
      return getPhoneStorageFormat(form.phone);
    }
    return "";
  };

  const validateBirthdayField = (): { isValid: boolean; error?: string } => {
    if (form.profile && "birthday" in form.profile && form.profile.birthday) {
      return validateBirthday(form.profile.birthday);
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
      accountType: form.accountType,
    };

    const { data } = await UpdateUser({ variables: { input: userInput } });
    // Update Profile after user is updated
    if (data.updateUser) {
      const profileInput = {
        bio: bio || null,
        birthday: getBirthdayForStorage(),
        displayName: displayName || null,
      };

      await UpdatePersonProfile({ variables: { input: profileInput } });
    }
  };

  const handleSubmit = () => {
    if (form.sellerType === "PERSON") {
      submitPersonProfile();
    } else if (form.sellerType === "STORE") {
    } else if (form.sellerType === "SERVICE") {
    }
  };

  return {
    form,
    isOpen,
    openModal,
    closeModal,
    countriesData: (countriesData?.countries as Country[]) || [],
    countriesLoading,
    regionsData: (regionsData?.regions as Region[]) || [],
    regionsLoading,
    citiesData: (citiesData?.cities as City[]) || [],
    citiesLoading,
    countiesData: (countiesData?.counties as County[]) || [],
    countiesLoading,
    updateCountry,
    updateRegion,
    updateCity,
    updateCounty,
    handleUpdateUser,
    updatePreferredContactMethod,
    handleUpdateProfile,
    handleBirthdayChange,
    handlePhoneChange,
    getBirthdayForStorage,
    getPhoneForStorage,
    validateBirthdayField,
    validatePhoneField,
    handleSocialMediaLinkChange,
    handleSubmit,
  };
}
