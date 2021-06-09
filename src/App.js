import "./styles.css";
import { Cards, Chart, CountryPicker } from "./components/index";
import React, { useState } from "react";
import fetchData from "./api/index";
import img from "./covid.png";

var flag = true;
export default function App() {
  const [storedData, storeData] = useState({ data: {}, countryData: {} });
  async function ComponentDidMount() {
    const { data } = await fetchData();
    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUdate: data.lastUpdate
    };
    if (flag) {
      flag = false;
      storeData({ data: modifiedData });
    }
    //storeData(modifiedData);
  }
  window.onload = ComponentDidMount();

  const handleCountryChange = async (country) => {
    const { data } = await fetchData(country);
    storeData({ data: data, country: data });
  };
  return (
    <div>
      <div className="image-container">
        <img src={img} />
      </div>
      <Cards data={storedData} />
      <CountryPicker countryChange={handleCountryChange} />
      <Chart countryData={storedData.country} />
    </div>
  );
}
