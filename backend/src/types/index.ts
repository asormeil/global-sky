export type Country = {
  /**
   * optional ID --> db will generate ity, we might need it
   * for our dev 
   */
  ID: number;
  name: string;
  iso2: string;
  dialCode: string;
  flag: string;
  region: string;
  native: string;
  capital: string;
  latitude: string;
  longitude: string;
};

export type State = {
  ID: number;
  name: string;
  code: string;
  latitude: string;
  longitude: string;
  countryName: string;
  countryID?: number;
};
