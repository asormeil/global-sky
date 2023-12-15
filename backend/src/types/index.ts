export type Country = {
  id: number;
  name: string;
  iso2: string;
  dialCode: string;
  flag: string;
  region: string;
  native: string;
  capital: string;
  latitude: number;
  longitude: number;
};

export type State = {
  id: string;
  name: string;
  code: string;
  latitude: string;
  longitude: string;
  countryID: number;
};
