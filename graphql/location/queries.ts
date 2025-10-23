import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      id
      country
    }
  }
`;

export const GET_REGIONS = gql`
  query RegionsByCountryId($countryId: ID!) {
    regionsByCountryId(countryId: $countryId) {
      id
      region
    }
  }
`;

export const GET_CITIES = gql`
  query CitiesByRegionId($regionId: ID!) {
    citiesByRegionId(regionId: $regionId) {
      id
      city
    }
  }
`;

export const GET_COUNTIES = gql`
  query CountiesByCityId($cityId: ID!) {
    countiesByCityId(cityId: $cityId) {
      id
      county
    }
  }
`;
