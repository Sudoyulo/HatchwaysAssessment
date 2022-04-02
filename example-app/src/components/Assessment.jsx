import React from "react";
import axios from "axios";


const Assessment = () => {

  let request = "";

  axios.get("https://api.hatchways.io/assessment/students")
    .then(res => {
      request = res;
    })

  return (
    <h1>
      Contents
      {request}
    </h1>

  )

}

export default Assessment;