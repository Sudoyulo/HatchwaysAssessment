
import axios from "axios";
import { useState, useEffect } from "react";

const Assessment = () => {

  const [request, setRequest] = useState([])

  const getInfo = () => {
    axios.get("https://api.hatchways.io/assessment/students")
      .then(res => {
        setRequest(res.data.students)
      })
  }

  const studentList = request.map((student) => {

    return (
      <p>{student.city}</p>
    )

  })

  useEffect(() => {
    getInfo();
  }, [])

  console.log(request)

  return (
    <h1>
      Contents
      {studentList}
    </h1>

  )

}

export default Assessment;