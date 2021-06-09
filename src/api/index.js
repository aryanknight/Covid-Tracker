import axios from "axios";

const url = "https://covid19.mathdro.id/api";
async function fetchData(country) {
  let changeAbleUrl = url;
  if (country) {
    changeAbleUrl = url + "/countries/" + country;
    console.log(changeAbleUrl);
  }
  if (country == "global") {
    changeAbleUrl = url;
  }
  try {
    const response = await axios.get(changeAbleUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function fetchDailyData(url) {
  try {
    const { data } = await axios.get(url + "/daily");

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }));
    return modifiedData;
  } catch (error) {}
}

async function countryPicker(url) {
  try {
    const {
      data: { countries }
    } = await axios.get(url + "/countries");
    //console.log(countries);
    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
}

export default fetchData;
export { fetchDailyData, countryPicker };
