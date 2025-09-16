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

  console.log("countries data:: ", countriesData);

  useEffect(() => {
    Countries();
  }, [Countries]);

  useEffect(() => {
    if (form.countryId) {
      Regions({ variables: { countryId: form.countryId } });
    }
  }, [form.countryId, Regions]);

  useEffect(() => {
    if (form.regionId) {
      Cities({ variables: { regionId: form.regionId } });
    }
  }, [form.regionId, Cities]);

  useEffect(() => {
    if (form.cityId) {
      Counties({ variables: { cityId: form.cityId } });
    }
  }, [form.cityId, Counties]);

  useEffect(() => {
    const loadProfile = () => {
      setForm({ ...data });
    };

    loadProfile();
  }, [data]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
  };
}
