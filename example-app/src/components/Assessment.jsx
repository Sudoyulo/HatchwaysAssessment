
import axios from "axios";
import { useState, useEffect } from "react";
import "./assessment.css"

const Assessment = () => {

  const [request, setRequest] = useState([])

  const getInfo = () => {
    axios.get("https://api.hatchways.io/assessment/students")
      .then(res => {
        setRequest(res.data.students)
      })
  }

  const calculateAverage = (grades) => {
    let sum = 0;
    grades.forEach((grade) => { sum += Number(grade) })
    return sum / grades.length;
  }

  const studentList = request.map((student) => {

    let average = Math.round(calculateAverage(student.grades) * 100) / 100;

    return (
      <div className="student">
        <div className="profile-picture">
          <img className="avatar" src={student.pic} alt="profile" />
        </div>
        <div className="student-traits">
          <h1 className="full-name">{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</h1>
          <p>Email: {student.email}</p>
          <p>Company: {student.company}</p>
          <p>Skill: {student.skill}</p>
          <p>Average: {average}%</p>
        </div>
      </div>
    )

  })

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <div id="information">
      {studentList}
    </div>

  )

}

export default Assessment;