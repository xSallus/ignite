interface ContinentCity {
  "city-banner": string;
  "city-name": string;
  "country-flag": string;
  "country-name": string;
}

interface CityCardProps {
  city: ContinentCity;
}

interface ContinentCitiesProps {
  cities: ContinentCity[];
}

interface Continent {
  id: string;
  uid: string;
  data: {
    name: string;
    banner: string;
    "description-short": string;
    "description-long": string[];
    idioms: number;
    countries: number;
    cities: ContinentCity[];
  };
}

interface ContinentShort {
  id: string;
  uid: string;
  data: {
    name: string;
    banner: string;
    "description-short": string;
  };
}

interface ContinentBannerProps {
  name: string;
  bg: string;
}

interface LinkProps {
  continent: ContinentShort;
}

interface SwiperProps {
  continents: ContinentShort[];
}

interface HeaderProps {
  path: string;
}

interface WrapperProps {
  children: string;
  icon: string;
}

interface HomeProps {
  continents: ContinentShort[];
}

interface ContinentProps {
  continent: Continent;
}

export {
  Continent,
  ContinentCitiesProps,
  CityCardProps,
  ContinentShort,
  SwiperProps,
  HomeProps,
  ContinentProps,
  LinkProps,
  HeaderProps,
  WrapperProps,
  ContinentBannerProps,
};
