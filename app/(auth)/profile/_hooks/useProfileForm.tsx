import {
  GET_CITIES,
  GET_COUNTIES,
  GET_COUNTRIES,
  GET_REGIONS,
} from "@/graphql/location/queries";
import useSessionStore, { defaultSeller } from "@/store/session";
import { City, Country, County, Region } from "@/types/location";
import { Seller } from "@/types/user";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export default function useProfileForm() {
  const { data } = useSessionStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<Seller>(defaultSeller);

  const [Countries, { data: countriesData, loading: countriesLoading }] =
    useLazyQuery(GET_COUNTRIES);
  const [Regions, { data: regionsData, loading: regionsLoading }] =
    useLazyQuery(GET_REGIONS);
  const [Cities, { data: citiesData, loading: citiesLoading }] =
    useLazyQuery(GET_CITIES);
  const [Counties, { data: countiesData, loading: countiesLoading }] =
    useLazyQuery(GET_COUNTIES);

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
      setForm({ ...data });
    };

    loadProfile();
  }, [data]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const updateCountry = (countryId: number) => {
    const country = countriesData.countries.find(
      (c: Country) => Number(c.id) === countryId
    );
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
    const region = regionsData.regions.find(
      (r: Region) => Number(r.id) === regionId
    );
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
    const county = countiesData.counties.find(
      (c: County) => Number(c.id) === countyId
    );
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

  const handleUpdateUser = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdateProfile = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, profile: { ...form.profile, [name]: value } });
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
  };
}
