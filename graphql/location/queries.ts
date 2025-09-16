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
  query Regions($countryId: ID!) {
    regions(countryId: $countryId) {
      id
      region
    }
  }
`;

export const GET_CITIES = gql`
  query Cities($regionId: ID!) {
    cities(regionId: $regionId) {
      id
      city
    }
  }
`;

export const GET_COUNTIES = gql`
  query Counties($cityId: ID!) {
    counties(cityId: $cityId) {
      id
      county
    }
  }
`;
