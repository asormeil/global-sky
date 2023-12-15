const fs = require("fs").promises;
const path = require("path");

import { Country, State } from "../src/types";
import { db } from "../src/utils/db.server";

async function readFiles(): Promise<[Array<Country>, Array<State>]> {
  const filePath = path.join(__dirname, "./countries.json");
  try {
    const data = await fs.readFile(filePath, "utf8");
    return getCountriesStates(Array.from(JSON.parse(data)));
  } catch (error) {
    console.log("Error in reading file.", error);
    throw error;
  }
}

function getCountriesStates(data: Array<any>): [Array<Country>, Array<State>] {
  let states: Array<State> = [];
  let countries: Array<Country> = [];

  data.forEach((country: any, index: number) => {
    countries.push({
      id: index,
      name: country.name,
      iso2: country.iso2,
      dialCode: country.dial_code,
      flag: country.flag,
      region: country.region,
      native: country.native,
      capital: country.capital,
      latitude: country.latitude,
      longitude: country.longitude
    });
    country.states.forEach((state: any) => {
      states.push({
        id: state.id,
        name: state.name,
        code: state.state_code,
        latitude: state.latitude,
        longitude: state.longitude,
        countryID: index
      });
    });
  });

  return [countries, states];
}
async function seed() {
  try {
    const [countries, states] = await readFiles();
    await Promise.all(
      countries.map((country) => {
        db.country.create({
          data: {
            id: country.id,
            name: country.name,
            iso2: country.iso2,
            flag: country.flag,
            latitude: country.latitude,
            longitude: country.longitude,
            capital: country.capital,
            dial_code: country.dialCode
          }
        });
      })
    );

    await Promise.all(
      states.map((state) => {
        db.state.create({
          data: {
            name: state.name,
            code: state.code,
            latitude: state.latitude,
            longitude: state.longitude,
            countryId: state.countryID
          }
        });
      })
    );
  } catch (error) {
    console.error("Error in seed function: ", error);
  }
}

seed();
