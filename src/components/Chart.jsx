import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../api/index";
import { Line, Bar, defaults } from "react-chartjs-2";

var flag = true;

function Charts(props) {
  const [dailyData, setDailyData] = useState([]);
  // defaults.animation = false;
  useEffect(() => {
    const fetchAPI = async () => {
      const fetchedData = await fetchDailyData(
        "https://covid19.mathdro.id/api"
      );
      if (flag) {
        flag = false;
        const newFetchedData = fetchedData.slice(-100, -1);
        setDailyData(newFetchedData);
      }
    };
    fetchAPI();
  });

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map((data) => new Date(data.date).toDateString()),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "blue",
            fill: true
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true
          }
        ]
      }}
    />
  ) : null;
  let confirmed, recovered, deaths;
  let value;
  let allData;
  if (props.countryData) {
    allData = props.countryData;
    confirmed = allData.confirmed.value;
    recovered = allData.recovered.value;
    deaths = allData.deaths.value;
  }
  const barChart = props.countryData ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)"
            ],
            data: [confirmed, recovered, deaths]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: "Current State" }
      }}
    />
  ) : null;

  return (
    <div className="charts">{props.countryData ? barChart : lineChart}</div>
  );
}

export default Charts;
