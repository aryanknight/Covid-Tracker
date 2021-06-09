import React, { useState } from "react";
import CountUp from "react-countup";

function Cards(props) {
  if (!props.data.data.confirmed) {
    return "Loading...";
  }
  //==============OR=====================
  // try {
  //   var k = props.data.confirmed.value;
  //   //console.log(props);
  // } catch (error) {}
  const confirmed_val = props.data.data.confirmed.value;
  const recovered_val = props.data.data.recovered.value;
  const deaths_val = props.data.data.deaths.value;
  const lastUpdate = new Date(props.data.data.lastUpdate).toDateString();
  return (
    <div className="container">
      <div className="cards" id="infected">
        <h1>Infected</h1>
        <h4>
          Numbers of Infected
          <br /> people from COVID-19
          <br />
          <h3>
            {" "}
            <CountUp
              start={0}
              end={confirmed_val}
              duration={1.5}
              separator=","
            />
          </h3>
        </h4>
      </div>
      <div className="cards" id="recovered">
        <h1>Recovered</h1>
        <h4>
          Numbers of recoveries
          <br /> from COVID-19
          <br />
          <h3>
            <CountUp
              start={0}
              end={recovered_val}
              duration={1.5}
              separator=","
            />
          </h3>
        </h4>
      </div>
      <div className="cards" id="deaths">
        <h1>Deaths</h1>
        <h4>
          Numbers of deaths
          <br /> from COVID-19
          <br />
          <h3>
            <CountUp start={0} end={deaths_val} duration={1.5} separator="," />
          </h3>
        </h4>
      </div>
    </div>
  );
}

export default Cards;
