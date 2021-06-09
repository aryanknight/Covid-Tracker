import React, { useEffect, useState } from "react";
import { countryPicker } from "../api/";
import { FormControl, NativeSelect } from "@material-ui/core";

function CountryPicker(props) {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(
        await countryPicker("https://covid19.mathdro.id/api")
      );
    };
    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <div className="country-picker-container">
      <FormControl>
        <NativeSelect
          defaultValue=""
          onChange={(e) => props.countryChange(e.target.value)}
        >
          <option value="global">Global</option>
          {fetchedCountries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default CountryPicker;
