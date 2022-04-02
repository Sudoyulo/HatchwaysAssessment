
import axios from "axios";
import { useState, useEffect } from "react";

const Assessment = () => {

  const [request, setRequest] = useState([])

  axios.get("https://api.hatchways.io/assessment/students")
    .then(res => {
      setRequest(res.data.students)
    })

  useEffect(() => {
  }, [request])

  return (
    <h1>
      Contents
      {request[0]}
    </h1>

  )

}

export default Assessment;