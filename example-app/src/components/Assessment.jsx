
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
          <p className="full-name">{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</p>
          <div className="traits">
            <p>Email: {student.email}</p>
            <p>Company: {student.company}</p>
            <p>Skill: {student.skill}</p>
            <p>Average: {average}%</p>
          </div>
        </div>
      </div>
    )

  })

  const searchbar = (key) => {

    let requestCopy = [...request];

    studentList(requestCopy.filter((student) => {
      return student.firstName.toUpperCase().includes(key)
    })
    )
  }

  useEffect(() => {
    getInfo();
  }, [])

  useEffect(() => {

  }, [request])

  return (
    <div id="information">
      <div id="header">
        <input className="search" type="text" placeholder="Search by name" onChange={(e) => { searchbar(e.target.value.toUpperCase()) }} />
      </div>
      {studentList}
    </div>

  )

}

export default Assessment;